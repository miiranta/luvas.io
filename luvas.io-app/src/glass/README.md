# Glass Styles Framework
By Lucas Miranda - luvas.io
Created for Angular projects.

---

## Setup

Add to src/styles.css:
```scss
@use "glass/styles.scss";
```

Install modules:
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

[config] =
```typescript
[
{
    title: string,
    description: string,
    img_src: string,
    link: string
}
]
```
[title] =
```typescript
 _: string
```



