# Form Crow
##### The form CRO widget as a service

## Install
`yarn`
## Scripts
`yarn watch` or `yarn start` to start node server at localhost:3000

### Widget
The purpose of the widget folder is to generate a script which can be embedded anywhere to be used with generated code like

```
<script src="https://formcrow.com/widget/formcrow.js">
<form-crow query="Turn down for what?" /></form-crow>
```

Run `yarn widget-watch` to watch or `yarn compile-widget` to compile the Vue app into a new custom component javascript file.


## Todo Widget

- [x] Add SASS Compiling
- [ ] Masking or auto formatting on contact form
- [x] Write form post event
- [ ] Fix auto-submit logic
- [ ] Theme color implementation
- [ ] Widget needs form ID as a prop


## Todo API
- [ ] Zapier integrations
- [x] Bcrypt password hashing
- [ ] Document Controllers and Models
- [x] Create contexts instead of separate model and controller folders
- [x] User Context
- [ ] Add mocha test suite
- [ ] Integrate stripe
- [ ] Add IP address geolocation


## Todo Frontend || Dashboard
- [ ] Site design documents on Figma
- [ ] Tie leads and queries together
- [ ] Click on a query and view all submissions (kyle)
- [ ] Creating a new query should generate embed code
