# Glass Styles Framework
By Lucas Miranda - luvas.io
Created for Angular projects.

---

## Setup

- Move "glass-assets" folder to "public".

- Add to src/styles.css:
```scss
@use "glass/styles.scss";
```

- Install modules:
```bash
npm i simplebar-angular --save
```

## Components

### \<glass-background>
Adds a nice background.

[config] =
```typescript
{
    type: "default" | "dark" | "light",
    mouse_follow: true | false,
    gradient: "" | "radial"
}
```

### \<glass-selector>
Adds a selection menu.

[items] =
```typescript
[
{
    title: string,
    description: string,
    img_src: string,
    link: string,
    tags: string[]
}
]
```
[config] =
```typescript
{
    title: string,
    height: number, // in px or vh
    width: number,  // in px or vw
}
```

### \<glass-navbar>
Adds a navigation bar.

[config] =
```typescript
{
    title_start: string,
    title_end: string,
    links: [[{
        title: string,
        link: string
    }]]
}
```
