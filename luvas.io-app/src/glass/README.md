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
### \<glass-loading>
Adds a loading screen.
Use the redirect service's navigateTo method to have this integrated.

Better results if you put it in the app component instead of in each page.
- In that case, in each other page, call glass-loading service showLoadingScreen() inside ngAfterViewInit().
```typescript
import { GlassLoadingService } from 'services/glass-loading/glass-loading.service';

private loadingService: GlassLoadingService = inject(GlassLoadingService);

ngAfterViewInit(){
    this.loadingService.hideLoadingScreen();
}
```
- OR, in each other page, you can use this component: 
```html
<glass-loading-close-on-view-init>
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
    title_start: string[],
    title_end: string[],
    links: [[{
        title: string,
        link: string,
        padding: string, // in px
    }]]
}
```

### \<glass-presentation-media>
Adds a media presentation.

[config] =
```typescript
{
    height: number,
    width: number,
}
```

[content] =
```typescript
[
    {src: string},
    ...
]

```

