<div align="center">

# Aquea

**A role-based marketplace and community platform where dealers post deals, freelancers bid on them, and hosts run ticketed events.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-aquea.netlify.app-558467?style=for-the-badge&logo=netlify&logoColor=white)](https://aquea.netlify.app)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v6-FF4154?logo=reactquery&logoColor=white)
![styled-components](https://img.shields.io/badge/styled--components-DB7093?logo=styledcomponents&logoColor=white)



</div>


## ✨ Overview

Aquea brings two marketplaces into one app:

- **Deals:** Dealers publish jobs with a budget range, required skills and expected duration. Users browse and filter them, then submit proposals with a bid, an estimated time and an optional attachment. The dealer reviews each proposal and accepts or rejects it.
- **Events:** Hosts create events. Users browse them by live status, buy tickets and join the discussion.

Everything is gated by **user roles**, backed by **Supabase** (auth, Postgres and file storage), and built with a **feature-based React architecture**.

> 🔗 **Try it live:** [aquea.netlify.app](https://aquea.netlify.app)

---

## 🔑 Demo accounts

Want to see what each role can do? The repo includes ready-to-use **dealer** and **host** accounts so you can log in and explore without signing up.

1. Open the file **`dealer and host users information.txt`** in the [`public`](./public) folder of this repo.
2. Copy an email and password from it.
3. Go to the [login page](https://aquea.netlify.app/login) and sign in.

| Log in as | What you can try |
| --- | --- |
| **Dealer** | Post a new deal, review incoming proposals on **Manage Proposals**, accept or reject bids, bid on other dealers' deals |
| **Host** | Create events, view them on the events page, buy tickets for other hosts' events |

> These are demo accounts for testing only. Please don't change their passwords or post inappropriate content.

---

## 🚀 Features

### 🤝 Deals and proposals
- Dealers post deals with title, description, min/max budget, expected duration and skills
- Filter deals by **budget range** and **skill search**
- Submit proposals with bid amount, estimated time, description and **file attachment** (Supabase Storage)
- Dealers get a dedicated **Manage Proposals** page to accept or reject bids
- Accepting a proposal **closes the deal** and **auto-rejects all other pending proposals**
- A user can submit only **one proposal per deal**
- Dealers **can't bid on their own deals**, only on other dealers' deals

### 🎟️ Events and tickets
- Hosts create events with location, start time and end time
- Event status (**upcoming / live / closed**) is computed from the event times
- Search events by title, description or location, and filter by status
- Buy and remove tickets, and see your tickets in one place
- Hosts **can't buy tickets for their own events**

### 💬 Comments
- Threaded discussion on every deal and every event
- Admins can moderate by deleting comments

### 👥 User management (admin only)
- Table of all users with **role filter** and **priority sorting**
- Create, edit and delete users from modals, including avatar upload

### 📊 Dashboard
- Personal stats (owned tickets, submitted proposals)
- Featured live and upcoming events, and the latest deals

### 🔐 Authentication and roles
- Email and password sign-up and login via Supabase Auth
- Protected routes, with a session-aware layout
- Four roles: `admin`, `host`, `dealer`, `user`

| Role | What they can do |
| --- | --- |
| **Admin** | Manage users, moderate comments |
| **Dealer** | Post deals, manage incoming proposals, bid on other dealers' deals |
| **Host** | Create events |
| **User** | Browse, submit proposals, buy tickets, comment |

---

## 🧱 Tech stack

| Area | Tools |
| --- | --- |
| Framework | React, Vite |
| Routing | React Router v6 |
| Server state | TanStack Query v6 (caching, mutations, invalidation) |
| Backend | Supabase (Auth, PostgreSQL, Storage, RPC) |
| Styling | styled-components |
| Forms | React Hook Form |
| Feedback | react-hot-toast |
| Icons | react-icons |
| Hosting | Netlify |

---

## 🏗️ Architecture

The project is organized **by feature**, with a thin service layer between the UI and Supabase and one custom hook per query or mutation.

```
src/
├── Authentication/      # Login, Signup, auth hooks
├── Components/          # App-level components (Header, Sidebar, Search, Headings)
├── Features/
│   ├── Deals/           # Deals list, filters, details
│   │   └── Proposals/   # Submit and manage proposals
│   ├── Events/          # Events list, filters, details
│   │   └── Tickets/     # Ticket purchase and listing
│   ├── Comments/        # Comments for deals and events
│   └── Users/           # Admin user management
├── Pages/               # Route-level pages
├── Services/            # Supabase API layer (dealsApi, eventsApi, ticketsApi, ...)
├── ui/                  # Reusable UI (Modal, Menus, Table, Form, Input, ...)
├── Utils/               # Helpers (e.g. getEventStatus)
├── App.jsx              # Routes and providers
└── main.jsx
```

### Design decisions worth noting

- **Compound components.** `Modal`, `Menus` and `Table` use the compound component pattern with React Context, so they stay flexible and declarative (`<Modal.Open>`, `<Modal.Window>`, `<Table.Row>`).
- **Separation of concerns.** UI components never talk to Supabase directly. Components call hooks, hooks call services, and services call Supabase.
- **Server state with TanStack Query.** Queries are keyed and invalidated after mutations so lists refresh without manual refetching.
- **Role-based access.** Routes and actions are guarded by role in the UI. Database rules (Row Level Security) are the source of truth for permissions.
- **Business rules in two places.** Rules like "you can't bid on your own deal" are checked in the UI for good UX and again in the API layer.

---

## 🛠️ Getting started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project

### 1. Clone and install

```bash
git clone https://github.com/AtaForouzesh/Aquea.git
cd Aquea
npm install
```

### 2. Configure Supabase

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL= https://nckxglzowhonsshanezj.supabase.co
VITE_SUPABASE_ANON_KEY= eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ja3hnbHpvd2hvbnNzaGFuZXpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MDM5MjksImV4cCI6MjEwNTM3OTkyOX0.7TiRHFeubsI-jBU46HQpMj-CzWisSKhY_25bqMqj2DM
```

Then read them in `src/Services/supabase.js`:

```js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export default supabase;
```

### 3. Database

The app expects these tables and resources:

| Resource | Purpose |
| --- | --- |
| `profiles` | User profile and role (linked to `auth.users`) |
| `profiles_with_rank` | View that adds `role_priority` for sorting |
| `deals` | Jobs posted by dealers |
| `proposals` | Bids on deals |
| `events` | Events created by hosts |
| `tickets` | Tickets bought by users |
| `comments` | Comments on deals or events |
| `delete_user_completely` | RPC function used by the admin panel |
| Storage buckets | `avatars`, `proposal-attachments` |


### 4. Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

---


## 🤝 Contributing

Contributions, issues and feature requests are welcome. Feel free to open an issue or submit a pull request.

---

## 📬 Contact

**Ata Forouzesh** 
[GitHub](https://github.com/AtaForouzesh) · Email: sinafroozesh@gmail.com

If you like this project, a ⭐ on the repo is much appreciated.
