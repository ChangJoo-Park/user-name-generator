# 사용자 이름 생성기
이메일 주소의 local-part를 이용하여 사용자의 이름을 생성하는 도구입니다.

## 조건
### 사용자 모델
사용자 모델은 email(string), userName(string)만을 가집니다. 
### 사용자 저장소
사용자 저장소 추상 클래스는 UserRepository 입니다. 이를 상속하여 테스트를 위해 UserMockRepository를 만들었습니다. 실제 데이터베이스를 이용하는 경우 UserRepository를 상속하여 사용하면 됩니다. 단, 테스트를 위해 단순한 *findByUserName* 메소드만 정의해두었습니다.

### 사용자 이름 생성기
사용자 이름 생성기는 입력받은 email과 UserRepository를  이용하여 사용자 이름을 생성합니다. 중복되는 이름이 있는 경우 *a-z, A-Z, 0-9*의 범위의 3글자를 무작위로 생성하여 사용자 이름 뒤에 추가합니다. 무작위로 생성된 문자열이더라도 중복되는 경우 그 뒤에 추가로 3글자를 더 붙입니다.

### 이메일 유효성 검사
이메일 유효성 검사는 다음 조건으로 처리했습니다.
- 존재 여부
- 총 길이가 320자 초과 여부 local(64자) + @ + doamin(255자)
- local part의 64자 초과 여부
- domain part의 255자 초과 여부
- local part의 시작 문자열이 특수문자일 수 없음
- local part의 문자열이 "."와 "-", "_"만 사용 됨
- domain part의 주소는 "."이 두개 까지만 사용 됨 (github.com.com.com 불가)

## 사용 방법
https://changjoo-park.github.io/user-name-generator/


또는

```terminal
# npm이 우선 설치되어 있어야 합니다. Node.js - https://nodejs.org
git clone https://github.com/ChangJoo-Park/user-name-generator
npm install
npm install -g webpack
webpack
open index.html
```

## 테스트
```terminal
npm run test
```

## 코드 포맷
```terminal
# eslint가 사전에 설치되어 있어야 합니다.
npm install -g eslint
npm run lint
```
