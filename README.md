# Multi-Step Form Wizard

A modern, type-safe multi-step form wizard built with Next.js 13+ (App Router) and TypeScript.

link: https://wizard-form-app.vercel.app/

## 🚀 Features

- Multi-step form with route-based navigation (`/step/1`, `/step/2`, etc.)
- Form state persistence between steps using Zustand
- Type-safe form validation with Zod
- Responsive, accessible UI with shadcn/ui components
- Modern date/time selection with react-day-picker
- Service selection with searchable modal
- Skills multi-select with tag input
- Comprehensive form review page
- Form data persistence in browser storage

## 🛠 Tech Stack

- **Framework:** Next.js 13+ (App Router)
- **Language:** TypeScript
- **Form Management:** React Hook Form
- **Validation:** Zod
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Date Picker:** react-day-picker
- **Date Utilities:** date-fns

## 📁 Project Structure

```
├── app/                   # Next.js App Router pages
│   ├── step/[step]/      # Dynamic step routes
│   ├── review/           # Review page
│   └── page.tsx          # Landing page
├── components/
│   ├── steps/            # Step-specific form components
│   └── ui/               # Reusable UI components
├── lib/
│   ├── schema.ts         # Zod validation schemas
│   └── utils.ts          # Utility functions
└── stores/
    └── formStore.ts      # Zustand form state management
```

## 🔄 Form Steps

1. **Basic Information**

   - Full name
   - Email address
   - Role selection
   - Newsletter subscription

2. **Meeting Schedule**

   - Preferred date
   - Preferred time
   - Timezone selection

3. **Services Selection**

   - Multi-select modal
   - Grouped service categories
   - Search and filter
   - Selected services management

4. **Skills & Interests**

   - Skills multi-select
   - Interested topics (free text)

5. **Preferences**

   - Work preference (Remote/Hybrid/On-site)
   - Conditional fields based on preference
   - Terms acceptance

6. **Review**
   - Complete form summary
   - Edit capabilities
   - Final submission

## 🔒 Form State Management

- Zustand store with persistence middleware
- Browser storage for form data
- Step completion tracking
- Type-safe state updates

## 🎨 UI/UX Features

- Responsive design
- Form validation feedback
- Step progress indication
- Conditional form fields
- Modal service selection
- Tag-based skill selection
- Date/time pickers
- Loading states
- Error handling

## 📦 Key Dependencies

- `next`: ^13.5.1
- `react`: ^18.2.0
- `react-hook-form`: ^7.53.0
- `zod`: ^3.23.8
- `zustand`: ^4.5.2
- `date-fns`: ^3.6.0
- `tailwindcss`: ^3.3.3
- `shadcn/ui` components
- `lucide-react`: ^0.446.0

## 🚀 Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💾 Data Persistence

Form data is automatically persisted in the browser's local storage using Zustand's persist middleware. This allows users to:

- Navigate between steps without losing data
- Close the browser and return later
- Edit previous steps
- Review all entered information before final submission

## 🎯 Form Validation

Each step implements comprehensive validation using Zod schemas:

- Required field validation
- Email format validation
- Minimum character requirements
- Custom validation rules
- Conditional validation based on selected options

## 🔄 State Updates

The form state is managed centrally using Zustand:

- Type-safe state updates
- Step completion tracking
- Form data persistence
- Reset functionality
