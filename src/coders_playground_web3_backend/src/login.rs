use candid::CandidType;
use serde::{Deserialize, Serialize};

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct LoginResponse {
    pub success: bool,
}

pub fn login_with_wallet(_wallet_address: String) -> LoginResponse {
    LoginResponse { success: true }
}

