# Unified Frontend

This repository is a Started template for a SaaS application frontend. It is based on Nuxt 3 and Vue 3. This code havily uses the "Layers" feature of the Nuxt 3 to implement a Domain Driven Design approach.

The main feature of this template is its coupling with the [Unified Backend](https://github.com/yooneskh/unified-backend) to make administration of entities easier. Through the code in the `admin` domain and the `Meta` fields exposed by the `Unified Backend`, we have utilities to easily manage the applications entities. Things like `resource-explorer`, `resource-object-dialog` and etc.

Aside from the administration utilities, this template comes with

- HTTP Request Utilities
- Dialog System (In code)
- Form Management
- Toast Message Notification


## Setup

Make sure to install the dependencies:

```bash
bun i
```

## Development Server

Start the development server on `http://localhost:8080`:

```bash
bun serve
```

## Production

Build the application for production in `SSR` mode:

```bash
bun run build
```

Build the application in `SPA` mode.

```bash
bun run generate
```