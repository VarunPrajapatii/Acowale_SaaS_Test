- Setup backend with express and necessary middlewares
- Made database model with prisma (User and Item)
- Made routes for user (/register, /login) used jwt and bcrypt - `/api/user/register` and `/api/user/login`
- Created authentication middlewares for item route
- Made Item routes to create, fetch all items, update and delete
- Migrated and generated Prisma client
- Tested all api thouroughly on Postman

- Setup Frontend with next.js and typescript
- Made / page redirect to /dashboard
- Created login and register pages
- /register and /login
    - It sends the email, password and role to the /api/user/register endpoint.
    - If authenticated then jwt token gets stored in the local storage
    - User redirected to dashboard
- Created /dashboard page
    - Its a secure page, authenticated users can access
    - Its checks for token in useEffect and it fetches all the list of items
    - It fetches the list of items based on page number (pagination)
    - It renders ItemForm component which helps user create new item and its quantity
    - It renders ItemList wrapped with pagination logic
    - ItemList renders the list of items with its admin name
    - A logout button, clicking which the token gets cleared and user logs out.
- Made backend rate limited, with a middleware (100 reqs in 15 minutes max)
- 








This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
