mod login;

use login::{login_with_wallet, LoginResponse};


#[ic_cdk::query]
pub fn login(wallet_address: String) -> LoginResponse {
    login_with_wallet(wallet_address)
}
