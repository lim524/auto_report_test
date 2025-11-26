// 템플릿 데이터 정의
const templates = {
    intro: [
        "금일 평가 개요 및 핵심 내용\n\n금일 테스트에서는 [grade] 과정 **[unit]**을(를) 활용한 [difficulty] 문항이 출제되었습니다. 주요 문항은 **[keyType]**을(를) 중심으로 구성되었으며, 같은 개념을 활용하더라도 **[goal]**에 대한 풀이법을 연습하는 시간을 가질 수 있도록 문항을 구성하였습니다. 해당 단원은 **[unitCore]**가 중심이 되는 단원입니다.",
        "금일 수업 및 평가 내용\n\n오늘 수업에서는 [grade] 과정의 **[unit]** 단원을 중점적으로 다루었습니다. 특히 **[keyType]** 유형을 집중적으로 점검하였으며, 단순 풀이보다는 **[goal]**에 도달할 수 있도록 지도하였습니다. 이 단원은 **[unitCore]**의 이해가 무엇보다 중요한 부분입니다.",
        "평가 및 학습 개요\n\n이번 시간에는 [grade] 과정 중 **[unit]** 단원에 대한 평가를 진행하였습니다. **[keyType]** 유형의 문제들을 통해 학생들의 이해도를 점검하였고, **[goal]**을 목표로 심도 있는 학습이 이루어졌습니다. **[unitCore]**가 이 단원의 핵심임을 다시 한번 강조하였습니다."
    ],
    diagnosis: [
        "학습 진단 및 오답 유형 분석\n\n[name] 학생은 늘 성실하게 학습에 임하고 있습니다. 금일 문제풀이에서 오답을 보인 부분은 주로 **[keyType]**의 문항에 집중되었습니다. 이는 **[errorCause]**로 인해 발생한 것으로 보여지며, 오답 풀이를 완료하고 하원할 수 있었습니다. [name] 학생은 해당 단원을 비롯하여 이전까지 학습한 단원에서도 효과적인 학습 방식이 성취도 향상에 유의미한 긍정적인 결과를 보이는 것으로 판단되었습니다.",
        "성취도 분석\n\n[name] 학생은 평소 과제 수행과 수업 태도가 매우 훌륭합니다. 다만 오늘 평가에서는 **[keyType]** 관련 문제에서 다소 어려움을 겪었습니다. 주된 원인은 **[errorCause]**에 있는 것으로 파악되며, 수업 시간 내에 오답 정리를 통해 부족한 부분을 보완하였습니다. 전반적으로 안정적인 학습 흐름을 보이고 있습니다.",
        "오답 분석 및 피드백\n\n[name] 학생의 학습 태도는 언제나 모범적입니다. 오늘 테스트 결과, **[keyType]** 유형에서 실수가 있었는데, 이는 주로 **[errorCause]**에서 기인한 것으로 분석됩니다. 즉각적인 피드백과 오답 수정을 통해 개념을 다시 잡았으며, 앞으로도 꾸준한 성장이 기대됩니다."
    ],
    plan: [
        "향후 지도 계획 및 다짐\n\n이에, 이후 EOM클래스 시간을 통하여 [keyType] 관련 유형을 반복하여 학습하고 개념의 정확한 정립을 얻어나갈 수 있도록 **[actionPlan]**을 진행하게 될 예정입니다. 늘 성실하게 학습에 임하는 [name] 학생이 어려움 없이 다양한 문항을 풀이해나갈 수 있도록 최선을 다해서 지도하겠습니다. 감사합니다.",
        "지도 방향 및 안내\n\n앞으로의 수업에서는 부족했던 [keyType] 유형을 보강하기 위해 **[actionPlan]**을 중점적으로 진행할 계획입니다. [name] 학생이 자신감을 가지고 실력을 키워나갈 수 있도록 꼼꼼히 지도하겠습니다. 가정에서도 많은 격려 부탁드립니다. 감사합니다.",
        "향후 학습 전략\n\n다음 시간에는 [keyType]에 대한 이해를 완벽히 하기 위해 **[actionPlan]** 위주의 학습을 진행할 것입니다. [name] 학생이 수학에 흥미를 잃지 않고 꾸준히 발전할 수 있도록 옆에서 최선을 다해 돕겠습니다. 감사합니다."
    ]
};

// 난이도 (임의 설정, 필요시 입력값으로 변경 가능)
const difficulty = "중상"; 

// DOM 요소 가져오기
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const resultArea = document.getElementById('resultArea');
const form = document.getElementById('reportForm');

// 랜덤 선택 함수
function getRandomTemplate(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// 텍스트 치환 함수
function replacePlaceholders(text, data) {
    let result = text;
    for (const [key, value] of Object.entries(data)) {
        // 정규표현식으로 모든 발생 패턴 치환 (예: [name])
        const regex = new RegExp(`\\[${key}\\]`, 'g');
        result = result.replace(regex, value);
    }
    // 추가 고정값 치환
    result = result.replace(/\[difficulty\]/g, difficulty);
    return result;
}

// 보고서 생성 함수
function generateReport() {
    // 입력값 가져오기
    const data = {
        name: document.getElementById('name').value.trim(),
        grade: document.getElementById('grade').value.trim(),
        unit: document.getElementById('unit').value.trim(),
        keyType: document.getElementById('keyType').value.trim(),
        goal: document.getElementById('goal').value.trim(),
        unitCore: document.getElementById('unitCore').value.trim(),
        errorCause: document.getElementById('errorCause').value.trim(),
        actionPlan: document.getElementById('actionPlan').value.trim()
    };

    // 필수 입력값 체크
    for (const [key, value] of Object.entries(data)) {
        if (!value) {
            alert('모든 항목을 입력해주세요.');
            return;
        }
    }

    // 각 섹션별 랜덤 템플릿 선택 및 치환
    const introText = replacePlaceholders(getRandomTemplate(templates.intro), data);
    const diagnosisText = replacePlaceholders(getRandomTemplate(templates.diagnosis), data);
    const planText = replacePlaceholders(getRandomTemplate(templates.plan), data);

    // 전체 텍스트 조합 (문단 사이 한 줄 띄우기)
    const fullReport = `${introText}\n\n${diagnosisText}\n\n${planText}`;

    // 결과 출력
    resultArea.value = fullReport;
}

// 복사 기능 함수
function copyToClipboard() {
    if (!resultArea.value) {
        alert('생성된 보고서가 없습니다.');
        return;
    }
    
    resultArea.select();
    document.execCommand('copy'); // 구형 브라우저 호환성 고려
    
    // Clipboard API 사용 시도 (최신 브라우저)
    if (navigator.clipboard) {
        navigator.clipboard.writeText(resultArea.value)
            .then(() => alert('클립보드에 복사되었습니다.'))
            .catch(() => alert('복사되었습니다. (구형 방식)'));
    } else {
        alert('클립보드에 복사되었습니다.');
    }
}

// 이벤트 리스너 등록
generateBtn.addEventListener('click', generateReport);
copyBtn.addEventListener('click', copyToClipboard);
