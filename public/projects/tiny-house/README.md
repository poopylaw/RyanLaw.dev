# Image files needed here

Drop your project screenshots into this folder using these exact filenames
(referenced from `src/lib/projects.ts`):

- `chamber.jpg`  — the physical test chamber photo
- `setup.jpg`    — the data collection setup photo (with laptop)
- `data.jpg`     — the temperature vs. time graph

Any common image format works (.jpg, .jpeg, .png, .webp) — just update the
filename to match in `src/lib/projects.ts` if you use a different extension.

## Adding images for other projects

Each project folder under `/public/projects/<slug>/` can hold its own images.
To wire them up, open `src/lib/projects.ts` and add an `images` array to that
project's entry, same pattern as the tiny house one:

```ts
images: [
  { src: "/projects/rc-vehicle-aero/car.jpg", caption: "Finished chassis" },
  { src: "/projects/rc-vehicle-aero/airflow.jpg", caption: "Airflow channel" },
],
```

The path always starts with `/projects/...` (not `/public/projects/...`) —
Next.js serves everything under `/public` from the site root.
