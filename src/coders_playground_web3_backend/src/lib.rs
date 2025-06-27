mod login;

use login::{login_with_wallet, LoginResponse};

#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[ic_cdk::update]
pub fn login(wallet_address: String) -> LoginResponse {
    login_with_wallet(wallet_address)
}
