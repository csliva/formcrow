# Form Crow
##### The form CRO widget as a service

## Install
`yarn`
## Scripts
`yarn watch` or `yarn start` to start node server at localhost:3000

### Widget
The purpose of the widget file is to generate a script which can be embedded anywhere to be used with generated code like

'''
<script src="https://formcrow.com/widget/formcrow.js"
<form-crow query="Turn down for what?" /></form-crow>
'''

Run `yarn widget-watch` or `yarn compile-widget` via the node scripts to compile or watch the Vue component into a new custom component javascript file.


## Todo

- [ ] Add SASS Compiling
- [x] Install MongoDB
- [x] Controllers and Models
- [ ] Update Readme more
- [ ] Document Controllers and Models
