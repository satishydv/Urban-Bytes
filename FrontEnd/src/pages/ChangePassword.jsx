import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { BACK_END_API } from "../Constants";

const ChangePassword = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [step, setStep] = useState("request");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: user?.email || "",
    otp: "",
    password: "",
    confirm: "",
  });

  const canSubmitRequest = useMemo(() => {
    return form.email.trim().length > 3;
  }, [form.email]);

  const canSubmitReset = useMemo(() => {
    return (
      form.email.trim().length > 3 &&
      form.otp.trim().length > 0 &&
      form.password.length >= 8 &&
      form.password === form.confirm
    );
  }, [form.email, form.otp, form.password, form.confirm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (!canSubmitRequest) {
      toast.error("Enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACK_END_API}/api/auth/request-password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email.trim() }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        setStep("verify");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACK_END_API}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          otp: form.otp.trim(),
          password: form.password,
        }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        setForm((prev) => ({ ...prev, otp: "", password: "", confirm: "" }));
        setStep("request");
        if (!user.isLogged) {
          navigate("/auth");
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-lg bg-black/30 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold">Change Password</h1>
        <p className="text-white/70 mt-2">
          Verify your email to update your password.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleRequestCode}>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white/70">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 focus:outline-none"
            />
          </div>

          {step === "request" && (
            <button
              type="submit"
              disabled={loading || !canSubmitRequest}
              className="w-full py-2 rounded-lg bg-[#FF4757] hover:bg-[#ff4756d5] transition-colors disabled:opacity-60"
            >
              {loading ? "Sending code..." : "Send Verification Code"}
            </button>
          )}
        </form>

        {step === "verify" && (
          <form className="mt-6 space-y-4" onSubmit={handleResetPassword}>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70">Verification Code</label>
              <input
                type="text"
                name="otp"
                value={form.otp}
                onChange={handleChange}
                placeholder="Enter code from email"
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70">New Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-white/70">Confirm Password</label>
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !canSubmitReset}
              className="w-full py-2 rounded-lg bg-[#FF4757] hover:bg-[#ff4756d5] transition-colors disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={handleRequestCode}
              className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              Resend Code
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
