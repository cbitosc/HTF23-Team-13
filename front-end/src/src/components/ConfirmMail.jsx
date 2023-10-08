import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function ConfirmMail() {
  const [otp, setOTP] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hardcodedOTP = '123456'; // Replace this with your actual OTP.
    if (otp === hardcodedOTP) {
      setVerificationStatus('Verification successful');
    } else {
      setVerificationStatus('Verification failed. Please try again.');
    }
  };

  return (
    <div className="otp-verification-container" style={{ margin: "2rem" }}>
      <h1 style={{ textAlign: "center"}}>Email Verification</h1><br/>
      <div className="otp-message">
        <p>Thank you for registering! To complete your registration, please enter the One-Time Password (OTP) that we sent to your email address.</p>
        <p>If you haven't received the OTP, please check your spam folder or request a new one.</p>
    </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="One time password"
              type="text"
              id="otp"
              onChange={handleOTPChange}
            />
        </div>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify
            </Button>
      </form>
      {verificationStatus && <p>{verificationStatus}</p>}
    </div>
  );
}



export default ConfirmMail;
