export default async function ({store, redirect}) {

  if (store.state.account_auth.auth.loggedIn == true) {
    return redirect('/')
  }

}
