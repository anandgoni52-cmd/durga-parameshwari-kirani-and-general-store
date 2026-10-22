# ದುರ್ಗಾ ಪರಮೇಶ್ವರಿ ಕಿರಾಣಿ ಆ್ಯಂಡ್ ಜನರಲ್ ಸ್ಟೋರ್ — ಪ್ರಕಟಣೆ ಮತ್ತು ನಿರ್ವಹಣೆ

## ವೆಬ್‌ಸೈಟ್ ಬಗ್ಗೆ

ಈ ಯೋಜನೆ ಸರಳ static website: `index.html`, `styles.css`, `script.js` ಮತ್ತು `images` ಫೋಲ್ಡರ್. GitHub Pagesಗೆ ಬೇಕಾದ `index.html` project root‌ನಲ್ಲಿದೆ. ಈ ಕಡತಗಳು GitHub Pagesಗೆ ಹೊಂದುವ relative paths ಬಳಸುತ್ತವೆ.

ಸ್ಥಳೀಯವಾಗಿ ನೋಡಲು Windows 11 File Explorer‌ನಲ್ಲಿ `C:\GroceryWebsite` ತೆರೆಯಿರಿ; `index.html` ಮೇಲೆ ಎರಡು ಬಾರಿ ಕ್ಲಿಕ್ ಮಾಡಿ. ಬದಲಾವಣೆ ಮಾಡಿದ ಬಳಿಕ ಬ್ರೌಸರ್‌ನಲ್ಲಿ `Ctrl+F5` ಒತ್ತಿ.

## ಉತ್ಪನ್ನ ಬೆಲೆಗಳನ್ನು ನವೀಕರಿಸುವುದು

ಬೆಲೆಗಳನ್ನು ಇಲ್ಲಿ ಯಾವುದನ್ನೂ ಊಹಿಸಿ ಹಾಕಿಲ್ಲ. `index.html` ನಲ್ಲಿ ಸಂಬಂಧಿಸಿದ ಉತ್ಪನ್ನದ ಬೆಲೆ ಅಂಶವನ್ನು ಹುಡುಕಿ:

```html
<strong data-price="">Ask in store</strong>
```

ಅಂಗಡಿಯ ನಿಜವಾದ ಬೆಲೆ ರೂಪಾಯಿಗಳಲ್ಲಿ `data-price` ಒಳಗೆ ಹಾಕಿ. ಉದಾಹರಣೆಗೆ, ನಿಜವಾದ ಬೆಲೆ ₹60 ಆಗಿದ್ದರೆ:

```html
<strong data-price="60">Ask in store</strong>
```

ಉಳಿಸಿ ಮರುಲೋಡ್ ಮಾಡಿದಾಗ ಪುಟವು `₹60` ಎಂದು ತೋರಿಸುತ್ತದೆ. ಬೆಲೆ ಖಾಲಿ ಇದ್ದರೆ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ “Ask in store”, ಕನ್ನಡದಲ್ಲಿ “ಬೆಲೆ ಅಂಗಡಿಯಲ್ಲಿ ವಿಚಾರಿಸಿ” ಕಾಣುತ್ತದೆ. ಬೆಲೆ ಬದಲಾಯಿಸಲು Notepad ಅಥವಾ VS Code ಬಳಸಿ; ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡ ಎರಡರಲ್ಲೂ ಉಳಿಸಿ ಪರಿಶೀಲಿಸಿ.

## ಮ್ಯಾನೇಜರ್ ಫೋಟೋಗಳು

ಮೂಲ ಫೋಟೋಗಳನ್ನು `images/manager1-shivanand.jpg` (ಎಡ, ಬಿಳಿ ಅಂಗಿಯ ಶಿವಾನಂದ) ಮತ್ತು `images/manager2-mahantesh.jpg` (ಬಲ, ಮಹಾಂತೇಶ) ಎಂದು ಇರಿಸಿ. ಎರಡೂ ಚಿತ್ರಗಳು ಈಗಾಗಲೇ ಈ projectನಲ್ಲಿ ಸೇರಿವೆ. `index.html` ಮರುಲೋಡ್ ಮಾಡಿ. ಫೋಟೋಗಳನ್ನು CSS ವೃತ್ತಾಕಾರದ frame‌ನಲ್ಲಿ ತೋರಿಸುತ್ತದೆ; ಮೂಲ ಚಿತ್ರ ಕಡತಗಳನ್ನು ಬದಲಾಯಿಸಬೇಡಿ.

## ಉಚಿತ GitHub Pages ಪ್ರಕಟಣೆ

> **ಗಮನಿಸಿ:** GitHub Free ಯೋಜನೆಯಲ್ಲಿ GitHub Pages ಪ್ರಕಟಿಸಲು repository ಸಾರ್ವಜನಿಕವಾಗಿರಬೇಕು. GitHub Pages ಜಾಲತಾಣ ಮತ್ತು repositoryಯ ಕಡತಗಳು ಸಾರ್ವಜನಿಕರಿಗೆ ಕಾಣಬಹುದು. ನೀವು ಸ್ಪಷ್ಟವಾಗಿ ಒಪ್ಪದಿದ್ದರೆ repositoryಯನ್ನು Public ಮಾಡಬೇಡಿ ಅಥವಾ ಪ್ರಕಟಣೆ ಮುಂದುವರಿಸಬೇಡಿ. GitHub Pro/Team ಮುಂತಾದ ಯೋಜನೆಗಳಲ್ಲಿ private repositoryಗೆ Pages ಲಭ್ಯವಾಗಬಹುದು; ಆದರೂ ಪ್ರಕಟಿತ ಪುಟವೇ ಸಾರ್ವಜನಿಕರಿಗೆ ಕಾಣುತ್ತದೆ. Custom domain ಅಥವಾ paid hosting ಅಗತ್ಯವಿಲ್ಲ.

1. `github.com` ಗೆ ಲಾಗಿನ್ ಮಾಡಿ. ಮೇಲಿನ `+` → **New repository** ಆಯ್ಕೆಮಾಡಿ.
2. Repository ಹೆಸರನ್ನು `durga-parameshwari-kirani-and-general-store` ಎಂದು ನೀಡಿ. Public/private ಆಯ್ಕೆಯನ್ನು ಓದಿ. ಸಾರ್ವಜನಿಕ ಪ್ರಕಟಣೆಗೆ ನಿಮ್ಮ ಅನುಮತಿ ಇದ್ದರೆ ಮಾತ್ರ **Public** ಆಯ್ಕೆಮಾಡಿ; ಇಲ್ಲದಿದ್ದರೆ ಇಲ್ಲಿ ನಿಲ್ಲಿಸಿ.
3. **Create repository** ಆಯ್ಕೆಮಾಡಿ. GitHubನಲ್ಲಿ **Add file → Upload files** ತೆರೆಯಿರಿ.
4. `C:\GroceryWebsite` ನಿಂದ `index.html`, `styles.css`, `script.js`, `README.md`, `README-kn.md` ಮತ್ತು ಸಂಪೂರ್ಣ `images` ಫೋಲ್ಡರ್‌ನ ಕಡತಗಳನ್ನು upload ಮಾಡಿ. Folder ರಚನೆ ಉಳಿಯುವಂತೆ `images` ಒಳಗಿನ ಎಲ್ಲಾ ಚಿತ್ರಗಳನ್ನೂ ಸೇರಿಸಿ.
5. **Commit changes** ಒತ್ತಿ. ನಂತರ repositoryಯ **Settings → Pages** ಗೆ ಹೋಗಿ.
6. **Build and deployment** ಅಡಿಯಲ್ಲಿ **Deploy from a branch** ಆಯ್ಕೆಮಾಡಿ; branch `main`, folder `/(root)` ಆಯ್ಕೆ ಮಾಡಿ **Save** ಒತ್ತಿ.
7. Pages ಪುಟದಲ್ಲಿ deployment ಸಿದ್ಧವಾದಾಗ ಕಾಣುವ `https://<ನಿಮ್ಮ-GitHub-ಬಳಕೆದಾರರ-ಹೆಸರು>.github.io/durga-parameshwari-kirani-and-general-store/` URL ತೆರೆಯಿರಿ. ಆ URLನಲ್ಲಿ `index.html`, CSS, JavaScript, ಚಿತ್ರಗಳು, Kannada/English ಭಾಷಾ ಬದಲಾವಣೆ, ಅಂಗಡಿ ಸ್ಥಳದ Google Maps ಲಿಂಕ್ ಪರಿಶೀಲಿಸಿ. WhatsApp ಸಂಖ್ಯೆಗಳನ್ನು ಪ್ರಕಟಣೆಯಿಂದ ತೆಗೆದುಹಾಕಲಾಗಿದೆ.
8. ಮುಂದಿನ ತಿದ್ದುಪಡಿಗಳಿಗೆ repositoryಯ ಅದೇ ಕಡತಗಳನ್ನು upload/commit ಮಾಡಿ. ಪ್ರಕಟಣೆ ಮುಗಿದಿದೆ ಎಂದು Pages ಪುಟದಲ್ಲಿ URL ಕಾಣಿಸಿಕೊಂಡು ಪುಟ ತೆರೆದಾಗ ಮಾತ್ರ ಪರಿಗಣಿಸಿ.

ಈ projectಗೆ Git repository ಅಥವಾ GitHub account ಸಂಪರ್ಕ ಈ ಕ್ಷಣದಲ್ಲಿ ಹೊಂದಿಲ್ಲ. ಆದ್ದರಿಂದ GitHubಗೆ ಫೈಲ್‌ಗಳನ್ನು upload ಮಾಡಿಲ್ಲ ಮತ್ತು site ಪ್ರಕಟವಾಗಿದೆ ಎಂದು ಹೇಳುತ್ತಿಲ್ಲ. GitHub Pages ಮೂಲ ಕಡತಗಳ ಪ್ರಕಟಣೆಯ ಮೂಲವಾಗಿ branch‌ನ root ಆಯ್ಕೆ ಮಾಡಲು ಅನುಮತಿಸುತ್ತದೆ.