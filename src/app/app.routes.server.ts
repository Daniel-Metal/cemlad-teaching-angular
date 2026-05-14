import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:id/edit',
    renderMode: RenderMode.Client
  },
  {
    path: 'carts',
    renderMode: RenderMode.Client
  },
  {
    path: 'carts/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
