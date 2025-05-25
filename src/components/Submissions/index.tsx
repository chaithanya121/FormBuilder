import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, Download, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { formsApi, FormSubmission as ApiFormSubmission } from "@/services/api/forms";

interface FormData {
  id: string;
  primary_id: string;
  name: string;
  submissions?: number;
}

interface FormSubmission {
  id: string;
  form_id: string;
  timestamp: string;
  data: Record<string, any>;
}

const Submissions = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [viewingSubmission, setViewingSubmission] = useState<FormSubmission | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const loadForms = async (id: string) => {
    try {
      console.log("Loading forms...");
      const data = await formsApi.getFormSubmissions(id);
      console.log("submissions", data);
      
      // Convert API submissions to local interface
      const convertedSubmissions: FormSubmission[] = Array.isArray(data) ? data.map(submission => ({
        id: submission.primary_id || submission.id || `sub-${Date.now()}`,
        form_id: submission.formId || submission.form_id || id,
        timestamp: submission.timestamp || new Date().toISOString(),
        data: submission.data || {}
      })) : [];
      
      setSubmissions(convertedSubmissions);
    } catch (error) {
      console.error("Error loading forms:", error);
      toast({
        title: "Error",
        description: "Failed to load saved forms",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const loadFormsData = async () => {
      try {
        const storedForms = await formsApi.getFormNameID();
        if (Array.isArray(storedForms) && storedForms.length > 0) {
          const convertedForms: FormData[] = storedForms.map(form => ({
            id: form.primary_id || form.id || `form-${Date.now()}`,
            primary_id: form.primary_id || form.id || `form-${Date.now()}`,
            name: form.name || 'Untitled Form',
            submissions: form.submissions || 0
          }));
          
          setForms(convertedForms);
          
          if (!selectedFormId && convertedForms.length > 0) {
            console.log("store", convertedForms[0]["primary_id"]);
            setSelectedFormId(convertedForms[0]["primary_id"]);
            loadForms(convertedForms[0]["primary_id"]);
          }
        }
      } catch (error) {
        console.error("Error parsing stored forms:", error);
        toast({
          title: "Error",
          description: "Failed to load forms",
          variant: "destructive",
        });
      }
    };

    loadFormsData();
  }, [selectedFormId, toast]);

  const getFilteredSubmissions = () => {
    if (!selectedFormId) return [];
    console.log("submissions", submissions);

    let filtered = submissions.filter((sub) => sub.form_id === selectedFormId);

    if (searchTerm) {
      filtered = filtered.filter((sub) => {
        const values = Object.values(sub.data || {});
        const valuesString = values.join(" ").toLowerCase();
        return valuesString.includes(searchTerm.toLowerCase());
      });
    }

    if (sortBy === "date") {
      filtered.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    }

    return filtered;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleString();
  };

  const handleDeleteSubmission = async (submissionId: string) => {
    try {
      await formsApi.deleteSubmittionData(submissionId);
      if (selectedFormId) {
        loadForms(selectedFormId);
      }
      toast({
        title: "Success",
        description: "Submission deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete data",
        variant: "destructive",
      });
    }
  };

  const exportSubmissionsToCSV = () => {
    const filteredSubmissions = getFilteredSubmissions();
    if (filteredSubmissions.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no submissions to export",
        variant: "destructive",
      });
      return;
    }

    const allFields = new Set<string>();
    filteredSubmissions.forEach((submission) => {
      Object.keys(submission.data || {}).forEach((key) => allFields.add(key));
    });

    const fields = Array.from(allFields);
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Submission ID,Timestamp," + fields.join(",") + "\n";

    filteredSubmissions.forEach((submission) => {
      let row = `"${submission.id}","${formatDate(submission.timestamp)}"`;
      fields.forEach((field) => {
        const value = submission.data[field] || "";
        row += `,"${String(value).replace(/"/g, '""')}"`;
      });
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `submissions-${selectedFormId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Success",
      description: "Submissions exported successfully",
    });
  };

  const selectedForm = forms.find((form) => form.primary_id === selectedFormId);
  const filteredSubmissions = getFilteredSubmissions();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-200 dark:via-indigo-300 dark:to-purple-200">
            Form Submissions
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          View and manage all form submissions
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-card/50 backdrop-blur-sm p-5 rounded-xl mb-8 border border-border shadow-lg"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Select
              value={selectedFormId || ""}
              onValueChange={(value) => {
                setSelectedFormId(value);
                loadForms(value);
              }}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select a form" />
              </SelectTrigger>
              <SelectContent>
                {forms.map((form) => (
                  <SelectItem
                    key={form.primary_id}
                    value={form.primary_id}
                  >
                    {form.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search submissions..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Select
              value={sortBy}
              onValueChange={(value: "date" | "name") => setSortBy(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="name">Field Values</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="gap-2"
              onClick={exportSubmissionsToCSV}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {selectedFormId ? (
          <Card className="rounded-lg overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-medium">
                  {selectedForm?.name || "Selected Form"} -{" "}
                  {filteredSubmissions.length > 0
                    ? filteredSubmissions.length
                    : 0}{" "}
                  Submissions
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/form-builder/${selectedFormId}`)}
              >
                Edit Form
              </Button>
            </div>
            <div className="overflow-x-auto">
              {filteredSubmissions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Data Preview</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">
                          {formatDate(submission.timestamp)}
                        </TableCell>
                        <TableCell>
                          {submission.data &&
                          typeof submission.data === "object" ? (
                            <div className="max-w-md truncate">
                              {Object.entries(submission.data)
                                .slice(0, 3)
                                .map(([key, value], i) => (
                                  <span key={i} className="mr-2">
                                    <span className="text-muted-foreground">
                                      {key}:
                                    </span>{" "}
                                    {String(value).substring(0, 20)}
                                    {String(value).length > 20 ? "..." : ""}
                                    {i < 2 ? ", " : ""}
                                  </span>
                                ))}
                              {Object.keys(submission.data).length > 3
                                ? "..."
                                : ""}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">No data</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setViewingSubmission(submission)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              onClick={() =>
                                handleDeleteSubmission(submission.id)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto bg-muted rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No submissions found
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-4">
                    {searchTerm
                      ? "Try adjusting your search terms to find submissions"
                      : "This form doesn't have any submissions yet"}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/form/${selectedFormId}`)}
                  >
                    Go to Form
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ) : (
          <div className="text-center py-12 bg-card rounded-lg">
            <div className="mx-auto bg-muted rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              No form selected
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              Select a form from the dropdown to view its submissions
            </p>
          </div>
        )}
      </motion.div>

      <Dialog
        open={!!viewingSubmission}
        onOpenChange={() => setViewingSubmission(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              Submitted on{" "}
              {viewingSubmission && formatDate(viewingSubmission.timestamp)}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {viewingSubmission && viewingSubmission.data && (
              <div className="bg-muted p-4 rounded-md border">
                {Object.entries(viewingSubmission.data).map(
                  ([key, value], index) => (
                    <div key={index} className="mb-3">
                      <div className="text-sm text-muted-foreground mb-1">{key}</div>
                      <div className="break-words">
                        {String(value)}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
            <div className="flex justify-end">
              <Button
                onClick={() => setViewingSubmission(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Submissions;
