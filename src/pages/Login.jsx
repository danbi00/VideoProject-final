import React from "react";
import styled from "styled-components";
import { FaUser, FaLock } from "react-icons/fa"

const LoginForm = () => {
  return (
    <StContainer>
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder='사용자명' required />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input type="password" placeholder='비밀번호' required />
          <FaLock className='icon' />
        </div>

        <div className="remember-forgot">
          <label><input type="checkbox" />로그인 유지</label>
          <a href="#"> 아이디/비밀번호 찾기</a>
        </div>

        <button type="submit">로그인</button>

        <div className="register-link">
          <p> 계정이 없으십니까? <a href="#">가입하기</a> </p>
        </div>
      </form>
    </StContainer>
  );
};

export default LoginForm;

const StContainer = styled.div`
  width: 60vw;
  height: 85vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  .input-box {
    position: relative;
    margin-bottom: 20px;

    input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .icon {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
    }
  }

  .remember-forgot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    label {
      font-size: 14px;
    }

    a {
      color: #007bff;
      text-decoration: none;
      font-size: 14px;
    }
  }

  button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }

  .register-link {
    text-align: center;
    margin-top: 10px;

    a {
      color: #007bff;
      text-decoration: none;
    }
  }
`;