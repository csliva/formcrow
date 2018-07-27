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

##### Widget Customization
The widget is customizable by passing in props. The main props will be:
1. id="form-id-generated-at-creation"
2. query="The question the form will ask"
3. prime_color="#xxxxxx" //The base color that will be used to build the css design

If further CSS customization is needed, the end user can use specificity to apply their own css properties. the id #formcrow has been left alone so any styles starting with the widget ID will overwrite regular widget styles.


## Todo Widget

- [x] Add SASS Compiling -- Now removed
- [x] Masking or auto formatting on contact form
- [x] Write form post event
- [x] Fix auto-submit logic
- [x] Theme color implementation
- [x] Widget needs form ID as a prop
- [x] Error codes
- [x] Determine if user color is light or dark


## Todo API
- [ ] Zapier integrations
- [x] Bcrypt password hashing
- [x] Document Controllers and Models
- [x] Create contexts instead of separate model and controller folders
- [x] User Context
- [ ] Integrate stripe
- [x] Add IP address geolocation


## Todo Frontend || Dashboard
- [x] Site design documents on Figma
- [x] Tie leads and queries together
- [x] Click on a query and view all submissions (kyle)
- [x] Creating a new query should generate embed code
