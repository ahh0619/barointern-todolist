# 🖥️ 바로인턴 프론트엔드 개발 과제

### 프로젝트 목적

- Next.js(App Router), TypeScript, Tanstack Query(react-query), Tailwind CSS를 활용하여 투두 리스트 애플리케이션을 구현하는 과제입니다.
- CRUD 기능을 직접 구현해보며, 서버 상태와 클라이언트 상태를 효율적으로 관리하고, 사용자 경험을 향상시키는 방법을 학습할 수 있습니다.

<br>

### 주요기능

- 할 일을 등록, 수정(완료표시), 삭제 할 수 있습니다.
- 모든 할 일과 완료된 일을 필터링하여 확인 할 수 있습니다.

<br>

### 사용한 기술 및 라이브러리

- Next.js
  - 라우팅 구조를 단순화하고, SSR/SSG 등 다양한 렌더링 방식을 유연하게 지원합니다.
- TypeScript
  - 점진적 타입 지정을 통해 타입 안정성을 보장하고, 개발 생산성과 유지보수성을 향상시킵니다.
- Tanstack Query
  - 서버 상태 로직을 분리하여 API 요청을 체계적으로 관리합니다.
  - 낙관적 업데이트, 캐시무효화 등의 기능을 통해 UX를 개선합니다.
- Tailwind CSS
  - 간단하고 직관적인 Utility-First 방식을 채택해 빠르게 UI를 개발합니다.

<br>

### 프로젝트 구조

```
├── app
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── Loading.tsx
│   ├── TodoClient.tsx
│   ├── TodoFilterTabs.tsx
│   ├── TodoInput.tsx
│   └── TodoItem.tsx
│   ├── TodoList.tsx
│   └── TodoStatus.tsx
├── hooks
│   └── useTodos.ts
├── lib
│   └── api.ts
├── provides
│   └── TodoQueryProvider.tsx
├── types
│   └── todo.ts
```
