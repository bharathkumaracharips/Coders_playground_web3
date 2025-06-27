use candid::CandidType;
use serde::{Deserialize, Serialize};

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct LoginResponse {
    pub success: bool,
    pub message: String,
}

#[ic_cdk::update]
pub fn login_with_wallet(wallet_address: String) -> LoginResponse {
    // Here you would add logic to check/store the wallet address, create a session, etc.
    // For now, just return a success message.
    LoginResponse {
        success: true,
        message: format!("Logged in with wallet address: {}", wallet_address),
    }
}
