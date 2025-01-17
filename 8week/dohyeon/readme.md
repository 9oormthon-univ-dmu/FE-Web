## 회원 기능 구현 가이드

---

### Token, Session, JWT

> 로그인 기능에서 사용자의 로그인 기록을 저장하여 편하게 사용할 수 있도록 한다.
- 사용자가 가입하면 서버는 사용자의 ID, Password 등의 정보를 DB에 저장한다.
- 로그인 하면 DB에서 사용자 정보를 비교해 확인하고 KEY를 발급한다.
- 발급된 KEY는 사용자가 가지고 다른 여러가지 요청을 보낼 때 같이 보낸다.

---

KEY는 Session 방식과 Token을 사용하는 방식으로 나뉜다.

- **Session**: 서버에서 로그인 정보를 저장하고 사용자에게 session ID를 발급해주는 방식
  - 장점: 요청마다 로그인 상태를 엄격하게 확인한다.
  - 단점: DB 조회를 많이 한다.
  
- **Token (JWT)**: 사용자에게 로그인 정보를 암호화한 Token을 보내주고, 요청마다 Token을 받아 확인한다.
  - Token을 암호화 할 때 비밀 키를 추가해 위조를 확인할 수 있다.
  - 장점: 요청을 처리할 때 DB를 조회하지 않는다.
  - 단점: token을 훔쳐가면 강제로 로그아웃 시킬 수 없다.

---

### OAuth

> OAuth는 다른 사이트에 로그인하여 사용 권한, 회원 정보 등을 빌려온다.
> 회원가입, 로그인을 다른 사이트의 정보로 하는 소셜 로그인을 만들 수 있다.
> Google, Facebook, Kakao 등 다양한 OAuth를 사용할 수 있다.
NextJS에는 NextAuth.js 라이브러리를 사용해 쉽게 구현 가능하다.

- 장점: 아이디/비번 로그인 구현, 사용자 정보를 DB에 보관 가능
- 단점: 아이디/비번 옵션을 사용하면 JWT로 제한된다. (보안 문제)

---

### 소셜 로그인

> next-auth를 사용해 Github 계정을 연결한 소셜 로그인을 구현한다.
> next-auth는 기본적으로 JWT 방식을 사용한다.

#### 설정 방법

깃허브의 OAuth를 사용하기 위해 OAuth App을 등록해야 한다.

1. github 로그인
2. Settings - Developer Settings - OAuth Apps 로 들어가 App을 추가한다.
3. url은 nextjs에서 사용하는 url을 작성한다 (개발중인 url은 localhost:3000)
[...nextauth].js 파일 설정
```
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "Github에서 발급받은ID",
      clientSecret: "Github에서 발급받은Secret",
    }),
  ],
  secret: "jwt생성시쓰는암호",
};
export default NextAuth(authOptions);
```
+ 민감한 정보는 .env 환경변수를 이용해 숨김 처리한다.
