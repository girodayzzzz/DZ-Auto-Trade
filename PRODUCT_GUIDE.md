# Kako dodati nov izdelek

Vsi izdelki so v datoteki `products.js`. Za nov izdelek ne potrebujete spreminjati HTML-ja.

## Najhitrejši postopek

1. Odprite `products.js`.
2. Kopirajte en obstoječ izdelek od `{` do `},`.
3. Prilepite ga tik pred zadnji `];`.
4. Spremenite podatke: `name`, `category`, `categoryLabel`, `description`, `price`, `badge`, `sku`, `availability`, `delivery` in `searchTerms`.
5. Če želite izdelek prikazati na prvi strani, nastavite `featured: true`.

## Dovoljene kategorije

Uporabite eno od teh vrednosti za `category`:

- `avto-deli`
- `cistila`
- `orodja`

## Primer izdelka

```js
{
  name: 'Novo čistilo za stekla',
  category: 'cistila',
  categoryLabel: 'Čistila',
  description: 'Hitro čistilo za stekla brez lis.',
  price: 'od 5,90 €',
  badge: 'Steklo',
  sku: 'DZ-GLS-001',
  availability: 'Na zalogi',
  delivery: '1–3 delovne dni',
  featured: false,
  searchTerms: 'steklo šipe čistilo brez lis',
  image: 'data:image/svg+xml,...',
  theme: 'linear-gradient(135deg, #075985, #0f172a)',
},
```
