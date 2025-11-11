#!/bin/bash
# ================================================
# DeepAiBit OG 미리보기 실시간 테스트 자동화 스크립트
# 작성자: 손재원
# ================================================

BRANCH="og-test"
DEPLOY_URL="https://$BRANCH-jaewonstore.vercel.app"
KAKAO_DEBUGGER="https://developers.kakao.com/tool/debugger/sharing?q=$DEPLOY_URL"

echo "🔧 현재 브랜치: $(git rev-parse --abbrev-ref HEAD)"

# 1️⃣ 테스트 브랜치 생성 (없으면 새로 만듦)
if [ "$(git branch --list $BRANCH)" ]; then
  echo "⚙️  기존 테스트 브랜치 감지됨 → 업데이트 중..."
  git checkout $BRANCH
  git merge main -m "merge main into $BRANCH for OG test" || true
else
  echo "✨ 새 테스트 브랜치 생성..."
  git checkout -b $BRANCH
fi

# 2️⃣ 커밋 및 푸시
echo "🚀 변경사항 푸시 중..."
git add .
git commit -m "chore: run OG image test build" || true
git push origin $BRANCH -f

# 3️⃣ Vercel 프리뷰 링크 안내
echo ""
echo "✅ 배포 프리뷰 확인:"
echo "👉 $DEPLOY_URL"

# 4️⃣ 카카오 디버거 링크 안내
echo ""
echo "⚡ 카카오톡 미리보기 갱신:"
echo "👉 $KAKAO_DEBUGGER"
echo ""
echo "카카오 디버거 페이지를 열고 '미리보기 갱신' 버튼을 클릭하세요."
