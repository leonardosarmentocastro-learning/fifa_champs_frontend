# fifa_champs_frontend

## Roadmap

1. Refactor:
  * Turn `index.js` files into barrels that exports the actual component (the component should be named as `ActionButton` not `action-button`)
  * The respective style files should replace `index.styles.css` to `ActionButton.styles.css`
  * The style main class should be the component name, e.g.: `.ActionButton` instead of `.action-button`
2. Sign up page
  * form:
    * email address
      * [frontend] validation: can't be empty
      * [frontend] validation: is valid email? (maybe use "email validator" package)
      * [backend] validation: is already in use?
    * username
      * [frontend] validation: can't be empty
      * [frontend] validation: not more than 16 characters
      * [backend] validation: is already in use?
    * password
      * [frontend] validation: can't be empty
      * [frontend] validation: not strong enough (show a check for each one validate checks)
  * after completed successfully
    * get token on "Authorization" header
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