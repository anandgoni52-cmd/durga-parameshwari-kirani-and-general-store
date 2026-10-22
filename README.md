# Durga Parameshwari Kirani and General Store

## Run locally on Windows 11
1. Press Windows key + E to open File Explorer.
2. Enter `C:\GroceryWebsite` in the address bar.
3. Double-click `index.html` to open the site in your browser.
4. Use the Kannada / English selector to change languages. On mobile, use Menu to open navigation.

## Catalog and prices
- The catalog contains 43 common grocery items across six categories. Use its search and category filters to find items.
- Edit names, pack sizes, categories, reference prices, and source links in `products.js`. Change an item's numeric `price` to update the displayed reference.
- Displayed prices are online reference prices checked against BigBasket listings. Prices vary by region, date, and offer; they are not confirmed shop selling prices. Each product links to its reference source.
- Current product art is representative SVG artwork, not an exact branded package photo. To add a real product photo, place it in `images/products/` and update the product artwork rendering in `script.js` to use that image path.

## Cart and WhatsApp orders
1. Select **Add to cart** on a product. Change quantity with `+` / `−` or remove it from the cart.
2. Add any missing grocery item by name in the cart.
3. Copy the list or open a pre-filled WhatsApp order message to the shop's selected contact. The number is encoded in the WhatsApp link and is not printed in the page text.
4. The cart is saved in this browser. The subtotal uses reference prices; confirm the final prices and stock with the shop.

## Photos and other sections
- The original managers' photos are `images/manager1-shivanand.jpg` and `images/manager2-mahantesh.jpg`.
- Shop photos are in `images/`. The site also retains shop location, contact, offers, and service sections.
- After editing a file, save it and press `Ctrl+F5` in the browser to reload.

## GitHub Pages
After the site files are committed to a GitHub repository, configure GitHub Pages under **Settings → Pages** with **Deploy from a branch**, branch `main`, folder `/(root)`. Wait for the Pages deployment to succeed in Actions, then open the URL shown on the Pages settings page. The published website is public; review repository visibility and included information before publishing.
