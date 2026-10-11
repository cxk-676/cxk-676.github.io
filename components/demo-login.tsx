"use client";

import { useState } from "react";
import { KeyRound, Smartphone, Sparkles } from "lucide-react";
import { DemoStorage, type DemoAccount } from "../lib/demo-storage";

type Props = { onLogin: (account: DemoAccount) => void };

export function DemoLogin({ onLogin }: Props) {
  const [mode, setMode] = useState<"password" | "otp">("password");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [issuedOtp, setIssuedOtp] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!account.trim()) return setMessage("请输入演示学号或手机号");
    if (mode === "password" && !password.trim()) return setMessage("请输入演示密码");
    if (mode === "otp" && (!issuedOtp || !/^\d{6}$/.test(otp) || otp !== issuedOtp)) return setMessage("请输入本机生成的模拟验证码");
    const session = { account: account.trim(), loginMethod: mode } as const;
    new DemoStorage(localStorage).saveAccount(session);
    onLogin(session);
  };

  const issueOtp = () => {
    const value = new DemoStorage(localStorage).issueOtp();
    setIssuedOtp(value);
    setMessage(`模拟验证码：${value}（未发送短信）`);
  };

  return <main className="login-screen"><section className="login-card"><div className="login-brand"><i><Sparkles size={21}/></i><span><b>成理校园 AI 管家</b><small>校园服务演示版</small></span></div><div className="demo-badge">登录为本机演示 · 官方入口与网络搜索真实可用</div><h1>欢迎使用</h1><p>请使用任意演示学号或手机号进入，例如 <b>2026010001</b>。</p><div className="login-tabs"><button className={mode === "password" ? "on" : ""} onClick={() => setMode("password")} type="button"><KeyRound size={15}/>密码登录</button><button className={mode === "otp" ? "on" : ""} onClick={() => setMode("otp")} type="button"><Smartphone size={15}/>验证码登录</button></div><form onSubmit={submit}><label>学号 / 手机号<input value={account} onChange={(event) => setAccount(event.target.value)} inputMode="numeric" placeholder="请输入演示账号" autoFocus/></label>{mode === "password" ? <label>演示密码<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="任意非空内容即可"/></label> : <label>模拟验证码<span className="otp-row"><input value={otp} onChange={(event) => setOtp(event.target.value)} inputMode="numeric" placeholder="6 位验证码"/><button type="button" onClick={issueOtp}>生成验证码</button></span></label>}{message && <p className="login-message">{message}</p>}<button className="primary login-submit">进入演示系统</button></form></section></main>;
}
