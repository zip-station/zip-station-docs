---
sidebar_position: 4
title: "Coding Standards"
---

# Coding Standards

Follow these conventions when contributing to Zip Station.

## .NET (API and Worker)

- **Follow existing patterns** — Look at similar controllers/services for reference
- **Gateways** for auth — All controller actions go through a gateway that verifies the user's JWT and scopes data to their tenant
- **Repositories** for data access — Never query MongoDB directly from controllers or services
- **Command Models** for input — Use `CommandModel` classes for request bodies
- **Response Models** for output — Never return entities directly; map to response DTOs
- **AutoMapper** for mapping — Define profiles in the `Mapping/` folder
- **Soft-delete** — Use `IsVoid = true` instead of actually deleting documents

## React (SPA)

- **Functional components** only — No class components
- **TanStack Query** for server state — All API calls go through query/mutation hooks
- **Zustand** for client state — UI state like modals, sidebar, and theme
- **TailwindCSS** for styling — No inline styles or CSS modules
- **shadcn/ui** patterns — Use the existing component library in `components/ui/`
- **TypeScript** — All code is typed; avoid `any`

## MongoDB

- **camelCase** field names — MongoDB convention pack handles this
- **BaseEntity** — All entities inherit from it (`Id`, `CreatedAt`, `UpdatedAt`, `IsVoid`)
- **Soft-delete** — Set `IsVoid = true` rather than removing documents
- **Indexes** — Add indexes for fields used in frequent queries

## General

- Write clear commit messages
- Keep PRs focused on a single feature or fix
- Test your changes locally before submitting
