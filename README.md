# OCaptainMyCaptain

"The powerful play goes on and you may contribute a verse. What will your verse be?"

WEEK 1 — Foundation + Planning
All
Finalize core features (no scope creep)

Decide DB schema (users, archives, items)

Define API contracts (very important before coding)

Backend (2 people)
Setup Express project

Setup PostgreSQL (local first, Neon optional)

Setup folder structure (routes, controllers, db)

Create basic server (/health route)

Design DB schema:

users

archives

items (books/music/art/links)

Frontend (2 people)
Create wireframes (home, login, archive page)

Decide design system (fonts, colors, layout)

Setup project (Next.js or simple React)

Build static UI:

Home page

Archive layout (record player + bookshelf concept)

WEEK 2 — Core Development
Backend
Auth:

Register

Login (JWT)

CRUD APIs:

Create archive

Add item

Get public archive

Middleware:

Auth check

Error handling

Frontend
Connect to backend APIs

Build:

Login / Register UI

Create archive flow

Render archive page dynamically

Start music embed (Spotify iframe, no heavy logic)

WEEK 3 — Integration + Polish
Backend
Optimize queries

Add validation

Clean API responses

Test all endpoints

Frontend
Improve UI polish (aesthetic theme)

Add:

Record player animation (CSS only)

Bookshelf layout

Handle loading + error states

All
Integration testing (frontend + backend together)

Fix breaking issues

WEEK 4 — Deployment + Final Fixes
Backend Deployment
Push repo to GitHub

Deploy to Render

Add env variables:

DATABASE_URL

JWT_SECRET

Connect to Neon

Frontend Deployment
Deploy to Vercel

Add API base URL

Final Checks
Test full flow:

Register → Login → Create archive → View public page

Check mobile responsiveness

Fix bugs

Clean UI

API CONTRACT (decide early)
Must finalize in Week 1:

POST /auth/register

POST /auth/login

GET /archive/:username

POST /archive

POST /items

DELETE /items/:id

IMPORTANT RULES
No image uploads → only URLs

No video hosting

No real-time features

Keep backend simple (REST only)

Build locally first, deploy later
