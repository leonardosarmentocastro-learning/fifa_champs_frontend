# fifa_champs_frontend

## Roadmap

1. Refactor:
  <!-- * Turn `index.js` files into barrels that exports the actual component (the component should be named as `ActionButton` not `action-button`) -->
  <!-- * The respective style files should replace `index.styles.css` to `ActionButton.styles.css` -->
  <!-- * The style main class should be the component name, e.g.: `.ActionButton` instead of `.action-button` -->
2. Sign up page
  <!-- * Add variant for "isDisabled" on "ActionButton" -->
  * "an error has occured" page state
  * form:
    <!-- * email address -->
      <!-- * [frontend] validation: can't be empty -->
      <!-- * [frontend] validation: is valid email? (maybe use "email validator" package) -->
      <!-- * [backend] validation: is already in use? -->
    <!-- * username -->
      <!-- * [frontend] validation: can't be empty -->
      <!-- * [frontend] validation: not more than 16 characters -->
      <!-- * raise "maxlength" to 24 characters -->
      <!-- * [backend] validation: is already in use? -->
    <!-- * password -->
      <!-- * [frontend] validation: can't be empty -->
      <!-- * [frontend] validation: not strong enough (show a check for each one validate checks) -->
  * after completed successfully
    <!-- * get token on "Authorization" header -->
    * fire the Authentication process (redux)
      * [search] how to and what to test?
    * show success page (to be defined - look at the "Premier league" website)
3. Sign in page
  * form:
    * choose between "email" or "username"
    * if receives "email"
      * [frontend] validation: can't be empty
      * [frontend] validation: is valid email? (maybe use "email validator" package)
    * if receives "username"
      * [frontend] validation: can't be empty
    * password
      * [frontend] validation: can't be empty
    * on submit
      * if error
        * [backend] validation: combination of credentials does not match
      * if success
        * get token on "Authorization" header
        * fire the Authentication process (redux)
          * add unit tests
        * show "welcome" page (to be defined - look at the "Premier league" website)
4. Logout button
  * Destroy the token on local storage
  * Redirects to "matches" page
5. Add a match
  * TBD
...
* i18n (so this work can be evaluted from my github)
* Add e2e tests with Cypress (using the backend on a docker container)


-----

neymar gifs

neymar explosão
https://media.giphy.com/media/d5NQmO0EFYPevpy1dn/giphy.gif
https://media3.giphy.com/media/d5NQmO0EFYPevpy1dn/giphy-downsized-small.mp4

neymar golaço super sayadin
https://giphy.com/gifs/super-neymar-saiyan-LLuUv0UWULqQU
https://media3.giphy.com/media/LLuUv0UWULqQU/giphy-downsized-small.mp4

neymar mad
https://giphy.com/gifs/fc-barcelona-neymar-jr-56zM89yEGQm6Q
https://media3.giphy.com/media/56zM89yEGQm6Q/giphy-downsized-small.mp4

marcelo
https://giphy.com/gifs/soccer-fifa-ey2tRBbjdQy5O
https://media2.giphy.com/media/ey2tRBbjdQy5O/giphy-downsized-small.mp4

SAMPLE:
```html
<video width="400" loop="loop" autoplay>
  <source src="https://media3.giphy.com/media/LLuUv0UWULqQU/giphy-downsized-small.mp4" type="video/mp4"/>
```
