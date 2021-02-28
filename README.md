# 채널톡 과제 : 나라 정보 관련 페이지 개발

이 프로젝트는 채널코퍼레이션 과제 수행 프로젝트입니다.

## 기술 스택
이 프로젝트에 사용된 기술은 다음과 같습니다.
- Language : TypeScript
- Library : React, Redux, Redux-thunk, Redux-form, Toast
- Styling : styled-components
- Production : Amazon Web Service, S3 Bucket 정적 웹사이트 호스팅 활용

## 프로젝트 시연
- Production : https://deploy-channeltalk.s3.ap-northeast-2.amazonaws.com/index.html
- Development
    1. 원하는 디렉토리에 진입하여 Commend 창에 https://github.com/sjly3k/channelio_assignment.git 입력
    2. 프로젝트 디렉토리로 진입하여 yarn start 명령어 실행 후 http://localhost:3001 접속

## 요구사항
- 나라 정보(코드, 수도, 이름, 대륙, 국가 전화번호)를 GET 으로 가져와 정보를 리스팅 해주는 페이지.

### 세부 요구사항
1. react, webpack을 베이스로 사용하여 개발 
    - OK
    
2. 보일러 플레이트(create-react-app 등)를 사용하지 않아야 함. 
    - OK (CRA를 사용하지 않고, Webpack과 Babel을 활용해 빌드)
    
3. 버튼을 누르면 각 필드별 오름차순, 내림차순 정렬이 되어야 함. 
    - OK 나라 정보에 포함되어 있는 모든 필드를 선택하고, 해당 필드에 대한 오름차순, 내림차순 정렬이 가능함.
    
4. 검색 창이 있어 통합 검색이 되어야 함. (Case insensitive, 부분일치) 
    - OK 나라 정보에 포함되어 있는 모든 필드에 대해 통합 검색이 가능하며, 대소문자 구분 없이 검색가능
    - 일부 단어만 입력하더라도 결과 확인 가능 (e.g. eou 입력 시 -> 수도가 Seoul인 대한민국의 정보가 노출) 
    
5. 각 나라의 데이터 Row에 삭제 버튼이 있어 누르면 삭제되어야 함.
    - OK 모든 데이터에 삭제 버튼이 존재.
    
6. 나라 정보를 입력해서 Row를 추가할 수 있어야 함.
    - 나라 정보를 입력하면 해당 국가 추가되고, 관련 알림이 등장
    
7. 모든 상태(나라 목록, 정렬 상태, 검색어 등)는 데이터 관리 라이브러리(Redux, MobX 등)에 저장되어야 함.
    - Redux를 활용해 모든 나라 정보, 검색어, 정렬 상태 (어떤 필드에 필터를 걸었는지, 오름/내림차순 인지), 로딩 상태를 저장하였음.
    
8. Network 통신은 redux middleware를 통해 되어야 함.
    - Redux-thunk와 Axios를 활용하여 네트워크 통신 구현
    
### 추가 요구사항
- 일부만 로딩 후 스크롤 아래로 갈 시 추가 로딩
    - Infinite Scroll 기능을 구현하여 스크롤 내릴 시 30개씩 추가로 나라 정보 등장
    
- form 라이브러리(redux-form, formik 등) 사용
    - Redux-form을 사용해 새로운 나라 추가하는 Form 제작
    
- cross browsing 적용
    - 사용한 모든 메소드 (indexOf, filter, some, concat, Lodash의 메소드)가 Poly-fill 없이 IE, Safari, Chrome에서 동작
    - Flex Box Model을 사용하여 디자인 진행하였고, 이 모델도 IE, Safari, Chrome에서 동작
    - 데스크톱 상에서 Responsive하게 구현하였음.
    
- 검색 기능 (Rate limiting(debounce, throttle) 적용하여 타이핑 시 바로 검색)
    - 검색 기능을 Debouncing을 활용해 구현하였음
