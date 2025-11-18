# Form Builder Agent - N8N Workflows

These workflows enable AI-powered form generation for your form builder application.

## Workflows Provided

### 1. **form-builder-agent-openai.json** - OpenAI Version
Uses OpenAI's GPT-4o model for form generation.

### 2. **form-builder-agent-openrouter.json** - OpenRouter Version
Uses OpenRouter to access multiple AI models (Claude, GPT-4, etc.)

## Setup Instructions

### For OpenAI Workflow:

1. **Import the workflow:**
   - Open N8N
   - Go to Workflows
   - Click "Import from File"
   - Select `form-builder-agent-openai.json`

2. **Configure OpenAI Credentials:**
   - Click on the "OpenAI Chat" node
   - Click "Create New Credentials"
   - Enter your OpenAI API Key
   - Save credentials

3. **Enable MCP Access (if using with Lovable):**
   - Go to Settings → MCP access in N8N
   - Toggle "Enable MCP access"
   - Go to workflow settings
   - Toggle "Available in MCP"

4. **Activate the workflow:**
   - Click "Active" toggle in top-right
   - Copy the webhook URL

### For OpenRouter Workflow:

1. **Import the workflow:**
   - Open N8N
   - Go to Workflows
   - Click "Import from File"
   - Select `form-builder-agent-openrouter.json`

2. **Configure OpenRouter Credentials:**
   - Click on the "OpenRouter API" node
   - Click "Create New Credentials" for HTTP Header Auth
   - Set Header Name: `Authorization`
   - Set Header Value: `Bearer YOUR_OPENROUTER_API_KEY`
   - Save credentials

3. **Update HTTP-Referer (Optional):**
   - In the "OpenRouter API" node
   - Update the HTTP-Referer header to your domain
   - This helps with OpenRouter's rate limiting

4. **Enable MCP Access:**
   - Same as OpenAI steps above

5. **Activate the workflow:**
   - Click "Active" toggle
   - Copy the webhook URL

## API Usage

### Request Format:

```json
POST https://your-n8n-instance.com/webhook/form-builder-agent
Content-Type: application/json

{
  "prompt": "Create a contact form with name, email, phone, message fields",
  "model": "anthropic/claude-3.5-sonnet",  // Only for OpenRouter version
  "context": "Additional context (optional)"
}
```

### Response Format:

```json
{
  "success": true,
  "formConfig": {
    "name": "contact-form",
    "title": "Contact Us",
    "description": "Get in touch with us",
    "elements": [
      {
        "id": "name-field",
        "type": "text",
        "label": "Full Name",
        "placeholder": "Enter your full name",
        "required": true,
        "validation": {
          "minLength": 2,
          "maxLength": 100,
          "message": "Please enter a valid name"
        }
      }
      // ... more elements
    ],
    "settings": {
      "theme": "modern",
      "layout": {
        "style": "card",
        "questionSpacing": 24,
        "labelAlignment": "top",
        "gridColumns": 1
      },
      "submitButton": {
        "text": "Submit",
        "style": "primary",
        "position": "right"
      }
    }
  },
  "metadata": {
    "generatedAt": "2025-01-18T12:00:00.000Z",
    "model": "gpt-4o",
    "provider": "openai"
  }
}
```

## Available Models (OpenRouter)

The OpenRouter version supports multiple models:
- `anthropic/claude-3.5-sonnet` (Recommended)
- `anthropic/claude-3-opus`
- `openai/gpt-4-turbo`
- `openai/gpt-4o`
- `google/gemini-pro`
- `meta-llama/llama-3-70b-instruct`

## Supported Form Field Types

The agent can generate these field types:
- **Input Fields:** text, email, number, phone, url, date, time, color
- **Text Areas:** textarea
- **Selection:** select, radio, checkbox
- **File Upload:** file
- **Advanced:** range, rating, signature
- **Layout:** divider, heading, paragraph, spacer
- **Media:** image, video
- **Custom:** html, code

## Integration with Your Form Builder

To integrate with your existing form builder:

```typescript
import { FormConfig } from '@/components/FormBuilder/types';

async function generateFormWithAI(prompt: string) {
  const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt })
  });
  
  const data = await response.json();
  
  if (data.success) {
    // Use the formConfig directly in your form builder
    const formConfig: FormConfig = data.formConfig;
    return formConfig;
  } else {
    throw new Error(data.error || 'Failed to generate form');
  }
}

// Usage in your form builder
const generatedForm = await generateFormWithAI(
  "Create a job application form with personal info, experience, and skills sections"
);
```

## Example Prompts

Here are some example prompts to test:

1. **Simple Contact Form:**
   ```
   Create a contact form with name, email, phone, and message fields
   ```

2. **Survey Form:**
   ```
   Create a customer satisfaction survey with rating scales, multiple choice questions, and a comments section
   ```

3. **Registration Form:**
   ```
   Create an event registration form with personal details, dietary preferences, t-shirt size, and emergency contact
   ```

4. **Order Form:**
   ```
   Create a product order form with quantity selector, size options, color picker, delivery address, and payment method selection
   ```

5. **Feedback Form:**
   ```
   Create a comprehensive feedback form with ratings for different aspects, yes/no questions, and open-ended feedback sections
   ```

## Advanced Features

### Context-Aware Generation:
Pass additional context to influence form generation:

```json
{
  "prompt": "Create a medical appointment form",
  "context": "This is for a dental clinic. Need fields for dental history and insurance information."
}
```

### Custom Validation:
The agent automatically adds appropriate validation rules based on field types.

### Responsive Layout:
Generated forms include responsive layout settings that work across devices.

## Troubleshooting

### Workflow Not Triggering:
- Ensure the workflow is active (toggle in top-right)
- Check that the webhook URL is correct
- Verify credentials are properly configured

### Invalid JSON Response:
- Check the AI model's response in N8N execution logs
- The parse node will show raw response if parsing fails
- May need to adjust system prompt if model isn't following format

### Rate Limiting (OpenRouter):
- Set HTTP-Referer header to your domain
- Consider implementing request queuing
- Use model with higher rate limits

### Empty or Incomplete Forms:
- Provide more detailed prompts
- Add context about required fields
- Adjust temperature parameter (lower = more consistent)

## Cost Considerations

### OpenAI:
- GPT-4o: ~$5-15 per 1M tokens
- Each form generation: ~$0.01-0.05

### OpenRouter:
- Varies by model
- Claude 3.5 Sonnet: ~$3-15 per 1M tokens
- GPT-4 Turbo: ~$10-30 per 1M tokens

## Security Best Practices

1. **Never expose webhook URLs publicly**
2. **Add authentication layer** if needed
3. **Validate input prompts** to prevent injection
4. **Rate limit requests** to prevent abuse
5. **Store API keys securely** in N8N credentials

## Next Steps

1. Import both workflows into N8N
2. Configure credentials for your chosen provider
3. Test with example prompts
4. Integrate webhook URL into your form builder
5. Enable MCP access for Lovable integration (optional)

## Support

For issues or questions:
- Check N8N execution logs
- Review the parse node output
- Test with simpler prompts first
- Verify API credentials are valid
