class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrixCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // 현재 언어 설정
        this.currentLanguage = 'ko';
        
        // 다국어 텍스트
        this.translations = {
            ko: {
                settings_title: 'Matrix 설정',
                font_label: '글꼴',
                font_size_label: '글꼴 크기',
                speed_label: '떨어지는 속도',
                color_label: '색상',
                mouse_effect_label: '마우스 효과',
                canvas_size_label: '캔버스 크기',
                title_input_label: '제목',
                message_input_label: '메시지',
                error_message: 'Matrix에서 연결이 끊어졌습니다',
                return_button: '현실로 돌아가기',
                ripple_option: '물결',
                explosion_option: '폭발',
                freeze_option: '정지',
                none_option: '없음',
                fullscreen_option: '전체화면',
                fixed_option: '고정크기',
                custom_option: '사용자정의'
            },
            en: {
                settings_title: 'Matrix Settings',
                font_label: 'Font',
                font_size_label: 'Font Size',
                speed_label: 'Drop Speed',
                color_label: 'Color',
                mouse_effect_label: 'Mouse Effect',
                canvas_size_label: 'Canvas Size',
                title_input_label: 'Title',
                message_input_label: 'Message',
                error_message: "You've been disconnected from the Matrix",
                return_button: 'Return to Reality',
                ripple_option: 'Ripple',
                explosion_option: 'Explosion',
                freeze_option: 'Freeze',
                none_option: 'None',
                fullscreen_option: 'Fullscreen',
                fixed_option: 'Fixed Size',
                custom_option: 'Custom'
            }
        };
        
        // 설정 기본값
        this.settings = {
            fontSize: 16,
            fontFamily: "'Noto Sans KR', sans-serif",
            speed: 5,
            color: 'green',
            mouseEffect: 'ripple',
            canvasSize: 'fullscreen'
        };
        
        // 색상 매핑
        this.colors = {
            green: '#00ff00',
            amber: '#ffbf00',
            gray: '#888888'
        };
        
        // Matrix 문자들 (의미있는 한글 단어들 + 영문)
        this.koreanWordsWithEnglish = [
            // 과일
            {ko: '사과', en: 'Apple'}, {ko: '배', en: 'Pear'}, {ko: '복숭아', en: 'Peach'}, {ko: '포도', en: 'Grape'}, {ko: '딸기', en: 'Strawberry'}, {ko: '바나나', en: 'Banana'}, {ko: '오렌지', en: 'Orange'}, {ko: '키위', en: 'Kiwi'}, {ko: '멜론', en: 'Melon'}, {ko: '수박', en: 'Watermelon'}, {ko: '체리', en: 'Cherry'}, {ko: '자두', en: 'Plum'}, {ko: '감', en: 'Persimmon'}, {ko: '귤', en: 'Tangerine'}, {ko: '망고', en: 'Mango'}, 
            // 대한민국 산
            {ko: '한라산', en: 'Hallasan'}, {ko: '지리산', en: 'Jirisan'}, {ko: '설악산', en: 'Seoraksan'}, {ko: '북한산', en: 'Bukhansan'}, {ko: '덕유산', en: 'Deokgyusan'}, {ko: '계룡산', en: 'Gyeryongsan'}, {ko: '월출산', en: 'Wolchulsan'}, {ko: '태백산', en: 'Taebaeksan'}, {ko: '소백산', en: 'Sobaeksan'}, {ko: '오대산', en: 'Odaesan'},
            // 지역
            {ko: '서울', en: 'Seoul'}, {ko: '부산', en: 'Busan'}, {ko: '대구', en: 'Daegu'}, {ko: '인천', en: 'Incheon'}, {ko: '광주', en: 'Gwangju'}, {ko: '대전', en: 'Daejeon'}, {ko: '울산', en: 'Ulsan'}, {ko: '세종', en: 'Sejong'}, {ko: '제주', en: 'Jeju'}, {ko: '강남', en: 'Gangnam'}, {ko: '홍대', en: 'Hongdae'}, {ko: '명동', en: 'Myeongdong'}, {ko: '이태원', en: 'Itaewon'}, {ko: '신촌', en: 'Sinchon'}, {ko: '종로', en: 'Jongno'},
            // 동물
            {ko: '호랑이', en: 'Tiger'}, {ko: '사자', en: 'Lion'}, {ko: '코끼리', en: 'Elephant'}, {ko: '기린', en: 'Giraffe'}, {ko: '판다', en: 'Panda'}, {ko: '늑대', en: 'Wolf'}, {ko: '여우', en: 'Fox'}, {ko: '토끼', en: 'Rabbit'}, {ko: '고양이', en: 'Cat'}, {ko: '강아지', en: 'Dog'}, {ko: '독수리', en: 'Eagle'}, {ko: '부엉이', en: 'Owl'}, {ko: '참새', en: 'Sparrow'}, {ko: '까치', en: 'Magpie'}, {ko: '제비', en: 'Swallow'},
            // 가족 관계
            {ko: '아버지', en: 'Father'}, {ko: '어머니', en: 'Mother'}, {ko: '할아버지', en: 'Grandfather'}, {ko: '할머니', en: 'Grandmother'}, {ko: '형', en: 'Brother'}, {ko: '누나', en: 'Sister'}, {ko: '언니', en: 'Sister'}, {ko: '오빠', en: 'Brother'}, {ko: '동생', en: 'Sibling'}, {ko: '아들', en: 'Son'}, {ko: '딸', en: 'Daughter'}, {ko: '남편', en: 'Husband'}, {ko: '아내', en: 'Wife'}, {ko: '삼촌', en: 'Uncle'}, {ko: '이모', en: 'Aunt'},
            // 아름다운 형용사
            {ko: '아름다운', en: 'Beautiful'}, {ko: '고운', en: 'Pretty'}, {ko: '예쁜', en: 'Cute'}, {ko: '맑은', en: 'Clear'}, {ko: '깨끗한', en: 'Clean'}, {ko: '순수한', en: 'Pure'}, {ko: '화사한', en: 'Bright'}, {ko: '우아한', en: 'Elegant'}, {ko: '청순한', en: 'Innocent'}, {ko: '따뜻한', en: 'Warm'}, {ko: '부드러운', en: 'Soft'}, {ko: '달콤한', en: 'Sweet'}, {ko: '빛나는', en: 'Shining'}, {ko: '환한', en: 'Bright'}, {ko: '평화로운', en: 'Peaceful'}
        ];
        
        // 초기 화면을 채울 문자들 (영문 + 한글 자음)
        this.initialChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        // Matrix 효과용 문자들 (기존)
        this.chars = '01234567890@#$%^&*()abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?+-=<>[]{}|\\:;"\'.,`~';
        this.drops = [];
        this.mouseEffects = [];
        this.occupiedSpaces = new Set(); // 겹침 방지를 위한 공간 추적
        this.colorChangeTimeouts = []; // 색상 변경 시 단어 변경 타이머들
        this.fillInterval = null; // 화면 채우기 인터벌 저장
        this.animationRunning = false; // 애니메이션 실행 상태
        
        this.init();
        this.setupEventListeners();
        this.setupLanguageToggle();
        this.updateLanguage();
        this.animate();
    }
    
    init() {
        this.resizeCanvas();
        this.initDrops();
        this.updateTheme();
        this.applyInitialFont();
    }
    
    // 초기 폰트 적용
    applyInitialFont() {
        const titleElement = document.getElementById('errorTitle');
        const messageElement = document.getElementById('errorMessage');
        
        if (titleElement) {
            titleElement.style.fontFamily = this.settings.fontFamily;
        }
        if (messageElement) {
            messageElement.style.fontFamily = this.settings.fontFamily;
        }
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.settings.fontSize);
    }
    
    // 설정 변경 시 애니메이션을 유지하면서 업데이트
    updateCanvasSettings() {
        this.columns = Math.floor(this.canvas.width / this.settings.fontSize);
        
        // 기존 drops 배열 크기 조정
        if (this.drops.length !== this.columns) {
            const oldDrops = [...this.drops];
            this.drops = [];
            
            for (let i = 0; i < this.columns; i++) {
                if (oldDrops[i]) {
                    // 기존 drop 재사용
                    this.drops[i] = oldDrops[i];
                } else {
                    // 새로운 drop 생성
                    this.drops[i] = {
                        y: -this.settings.fontSize * 10,
                        speed: Math.random() * this.settings.speed + 1,
                        chars: []
                    };
                }
            }
        }
        
        // staticGrid가 있다면 크기 조정
        if (this.staticGrid) {
            const rows = Math.ceil(this.canvas.height / this.settings.fontSize);
            const cols = this.columns;
            const oldGrid = this.staticGrid;
            
            // 새로운 격자 생성
            this.staticGrid = [];
            for (let row = 0; row < rows; row++) {
                this.staticGrid[row] = [];
                for (let col = 0; col < cols; col++) {
                    if (oldGrid[row] && oldGrid[row][col]) {
                        // 기존 데이터 유지
                        this.staticGrid[row][col] = oldGrid[row][col];
                    } else {
                        // 새로운 셀 생성
                        this.staticGrid[row][col] = {
                            char: '',
                            opacity: 0,
                            isKoreanWord: false,
                            filled: false
                        };
                    }
                }
            }
        }
    }
    
    initDrops() {
        this.drops = [];
        this.staticGrid = []; // 정적 격자 배열
        
        // 화면을 빈틈없이 가득 채우기 위한 격자 생성
        const rows = Math.ceil(this.canvas.height / this.settings.fontSize);
        const cols = this.columns;
        
        // 정적 격자 초기화 - 빈 상태로 시작
        for (let row = 0; row < rows; row++) {
            this.staticGrid[row] = [];
            for (let col = 0; col < cols; col++) {
                this.staticGrid[row][col] = {
                    char: '',
                    opacity: 0,
                    isKoreanWord: false,
                    filled: false
                };
            }
        }
        
        // Matrix 떨어지는 효과용 drops는 비어있는 상태로 시작
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = {
                y: -this.settings.fontSize * 10,
                speed: Math.random() * this.settings.speed + 1,
                chars: []
            };
        }
        
        // 즉시 점진적 화면 채우기 시작
        this.startGradualFill();
    }
    
    // 점진적으로 화면을 채우는 함수
    startGradualFill() {
        // 기존 인터벌이 있다면 정리
        if (this.fillInterval) {
            clearInterval(this.fillInterval);
            this.fillInterval = null;
        }
        
        const rows = this.staticGrid.length;
        const cols = this.columns;
        
        // 전체 셀 수
        const totalCells = rows * cols;
        
        // 참고 사이트와 비슷하게 빠르게 채우기 (약 0.8초 내에 완료)
        const fillDuration = 800; // ms
        const cellsPerFrame = Math.max(1, Math.floor(totalCells / (fillDuration / 16))); // 60fps 기준
        
        let filledCells = 0;
        
        // 무작위 순서로 셀들을 채우기 위한 배열 생성
        const cellPositions = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                cellPositions.push({ row, col });
            }
        }
        
        // 배열을 섞어서 무작위 순서로 만들기
        for (let i = cellPositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cellPositions[i], cellPositions[j]] = [cellPositions[j], cellPositions[i]];
        }
        
        // 애니메이션 루프
        this.fillInterval = setInterval(() => {
            // 이번 프레임에서 채울 셀 수만큼 처리
            for (let i = 0; i < cellsPerFrame && filledCells < totalCells; i++) {
                const { row, col } = cellPositions[filledCells];
                const char = this.initialChars[Math.floor(Math.random() * this.initialChars.length)];
                
                this.staticGrid[row][col] = {
                    char: char,
                    opacity: 1.0,
                    isKoreanWord: false,
                    filled: true
                };
                
                filledCells++;
            }
            
            // 모든 셀이 채워지면 정지
            if (filledCells >= totalCells) {
                clearInterval(this.fillInterval);
                this.fillInterval = null;
                
                // 1초 후 Matrix 효과로 전환
                setTimeout(() => {
                    this.startMatrixTransition();
                }, 1000);
            }
        }, 16); // 약 60fps
    }
    
    // Matrix 효과로 전환 시작
    startMatrixTransition() {
        // 정적 격자를 서서히 사라지게 하고 Matrix 효과 시작
        this.fadeOutStaticGrid();
        
        // 각 열에 Matrix 떨어지는 문자들 생성
        this.drops.forEach((drop, index) => {
            // 각 열마다 다른 시간에 시작
            setTimeout(() => {
                // 떨어지는 문자들 생성
                const numChars = Math.floor(Math.random() * 15) + 5;
                for (let j = 0; j < numChars; j++) {
                    let char, englishText = '';
                    let isKoreanWord = false;
                    
                    if (Math.random() < 0.25) {
                        const wordObj = this.koreanWordsWithEnglish[Math.floor(Math.random() * this.koreanWordsWithEnglish.length)];
                        char = wordObj.ko;
                        englishText = wordObj.en;
                        isKoreanWord = true;
                    } else {
                        char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    }
                    
                    drop.chars.push({
                        char: char,
                        englishText: englishText,
                        opacity: Math.random() * 0.8 + 0.2,
                        isKoreanWord: isKoreanWord
                    });
                }
                
                drop.y = -drop.chars.length * this.settings.fontSize;
            }, index * 50); // 각 열마다 50ms 차이
        });
        
        // 한글 단어 비율 점진적 증가 시작
        setTimeout(() => {
            this.increaseKoreanWordRatio();
        }, 3000);
    }
    
    // 정적 격자를 서서히 사라지게 함
    fadeOutStaticGrid() {
        const fadeInterval = setInterval(() => {
            let allFaded = true;
            
            for (let row = 0; row < this.staticGrid.length; row++) {
                for (let col = 0; col < this.staticGrid[row].length; col++) {
                    if (this.staticGrid[row][col].opacity > 0) {
                        this.staticGrid[row][col].opacity -= 0.02;
                        allFaded = false;
                    }
                }
            }
            
            if (allFaded) {
                clearInterval(fadeInterval);
                this.staticGrid = null; // 메모리 정리
            }
        }, 50);
    }
    
    // 점진적으로 한글 단어 비율 증가
    increaseKoreanWordRatio() {
        if (!this.drops) return;
        
        this.drops.forEach(drop => {
            drop.chars.forEach(charData => {
                // 일반 문자 중 일부를 한글 단어로 교체 (3% 확률)
                if (!charData.isKoreanWord && Math.random() < 0.03) {
                    const wordObj = this.koreanWordsWithEnglish[Math.floor(Math.random() * this.koreanWordsWithEnglish.length)];
                    charData.char = wordObj.ko;
                    charData.englishText = wordObj.en;
                    charData.isKoreanWord = true;
                }
            });
        });
        
        // 15초마다 반복하여 점진적으로 한글 단어 증가
        setTimeout(() => {
            this.increaseKoreanWordRatio();
        }, 15000);
    }
    
    updateTheme() {
        const color = this.colors[this.settings.color];
        document.documentElement.style.setProperty('--matrix-color', color);
        
        // 페이지 전체 색상 업데이트
        document.body.className = `theme-${this.settings.color}`;
        
        // 버튼 색상 업데이트
        const colorBtns = document.querySelectorAll('.color-btn');
        colorBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.color === this.settings.color) {
                btn.classList.add('active');
            }
        });
        
        // 색상 변경 시 단어들을 랜덤하게 시간차를 두고 변경
        this.triggerRandomWordChange();
        
        // 제목과 메시지도 파도처럼 색상 변경
        this.animateMessageColors();
        
        // UI 요소들도 순차적으로 색상 변경
        this.animateUIColors();
    }
    
    triggerRandomWordChange() {
        // 기존 타이머들 정리
        this.colorChangeTimeouts.forEach(timeout => clearTimeout(timeout));
        this.colorChangeTimeouts = [];
        
        // 모든 한글 단어들을 수집하고 각각에 개별 타이밍 부여
        let allKoreanWords = [];
        this.drops.forEach((drop, dropIndex) => {
            drop.chars.forEach((charData, charIndex) => {
                if (charData.isKoreanWord) {
                    allKoreanWords.push({
                        charData: charData,
                        dropIndex: dropIndex,
                        charIndex: charIndex
                    });
                }
            });
        });
        
        // 각 한글 단어에 대해 개별적으로 시간차를 두고 처리
        allKoreanWords.forEach((wordInfo, wordGlobalIndex) => {
            const charData = wordInfo.charData;
            const wordLength = charData.char.length;
            
            // 각 단어마다 다른 시작 시간 (300~800ms 사이 랜덤)
            const wordStartDelay = wordGlobalIndex * (Math.random() * 500 + 300);
            
            // 각 글자에 대한 색상 전환 정보 초기화
            if (!charData.charColorTransitions) {
                charData.charColorTransitions = [];
            }
            
            // 이 단어의 각 글자별로 순차적 색상 변경 타이머 설정
            for (let charIdx = 0; charIdx < wordLength; charIdx++) {
                const charDelay = wordStartDelay + (charIdx * 120); // 각 글자마다 120ms 간격
                
                const timeout = setTimeout(() => {
                    // 각 글자별 색상 전환 시작
                    charData.charColorTransitions[charIdx] = {
                        startTime: Date.now(),
                        duration: 700,
                        oldColor: charData.currentCharColors ? charData.currentCharColors[charIdx] || this.colors[this.getOldColor()] : this.colors[this.getOldColor()],
                        newColor: this.colors[this.settings.color]
                    };
                }, charDelay);
                
                this.colorChangeTimeouts.push(timeout);
            }
            
            // 단어 변경 (30% 확률) - 모든 글자 색상 변경이 끝난 후
            if (Math.random() < 0.3) {
                const wordChangeDelay = wordStartDelay + (wordLength * 120) + 300;
                const timeout = setTimeout(() => {
                    const wordObj = this.koreanWordsWithEnglish[Math.floor(Math.random() * this.koreanWordsWithEnglish.length)];
                    charData.char = wordObj.ko;
                    charData.englishText = wordObj.en;
                    // 새 단어로 바뀌면 색상 전환 정보 초기화
                    charData.charColorTransitions = [];
                    charData.currentCharColors = [];
                }, wordChangeDelay);
                
                this.colorChangeTimeouts.push(timeout);
            }
        });
        
        // 일반 문자들 처리
        this.drops.forEach((drop, dropIndex) => {
            drop.chars.forEach((charData, charIndex) => {
                if (!charData.isKoreanWord) {
                    const positionDelay = (dropIndex * 40) + (charIndex * 60);
                    const randomDelay = Math.random() * 800;
                    const totalDelay = positionDelay + randomDelay;
                    
                    const timeout = setTimeout(() => {
                        charData.colorTransition = {
                            startTime: Date.now(),
                            duration: 800,
                            oldColor: charData.currentColor || this.colors[this.getOldColor()],
                            newColor: this.colors[this.settings.color]
                        };
                    }, totalDelay);
                    
                    this.colorChangeTimeouts.push(timeout);
                }
            });
        });
    }
    
    getOldColor() {
        // 현재 색상이 아닌 이전 색상 반환
        const colors = ['green', 'amber', 'gray'];
        const otherColors = colors.filter(c => c !== this.settings.color);
        return otherColors[Math.floor(Math.random() * otherColors.length)];
    }
    
    animate() {
        if (!this.animationRunning) {
            this.animationRunning = true;
        }
        
        // 페이드 효과로 이전 프레임 지우기 (잔상 줄임)
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.font = `${this.settings.fontSize}px ${this.settings.fontFamily}`;
        
        // 정적 격자 그리기 (초기 화면 가득 채우기)
        if (this.staticGrid) {
            for (let row = 0; row < this.staticGrid.length; row++) {
                if (this.staticGrid[row]) {
                    for (let col = 0; col < this.staticGrid[row].length; col++) {
                        const gridChar = this.staticGrid[row][col];
                        if (gridChar && gridChar.filled && gridChar.opacity > 0) {
                            const x = col * this.settings.fontSize;
                            const y = (row + 1) * this.settings.fontSize; // +1은 텍스트 베이스라인 때문
                            
                            this.ctx.fillStyle = this.colors[this.settings.color] + Math.floor(gridChar.opacity * 255).toString(16).padStart(2, '0');
                            this.ctx.fillText(gridChar.char, x, y);
                        }
                    }
                }
            }
        }
        
        // 각 열의 떨어지는 문자들 그리기
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];
            
            for (let j = 0; j < drop.chars.length; j++) {
                const charData = drop.chars[j];
                const x = i * this.settings.fontSize;
                const y = drop.y - (j * this.settings.fontSize);
                
                // 초기 화면 채우기 단계에서는 모든 문자 표시, 나중에는 화면 범위 체크
                const isInitialPhase = drop.y >= 0 && drop.y < this.canvas.height;
                if (!isInitialPhase && (y < -this.settings.fontSize || y > this.canvas.height + this.settings.fontSize)) {
                    continue;
                }
                
                // 첫 번째 문자는 밝게, 나머지는 점점 어둡게
                let brightness = j === 0 ? 1 : Math.max(0.1, 1 - (j * 0.1));
                let currentColor = this.colors[this.settings.color];
                
                // 색상 전환 효과 처리
                if (charData.colorTransition) {
                    const elapsed = Date.now() - charData.colorTransition.startTime;
                    const progress = Math.min(elapsed / charData.colorTransition.duration, 1);
                    
                    if (progress < 1) {
                        // 색상 보간 (이전 색상에서 새 색상으로 부드럽게 전환)
                        const oldRGB = this.hexToRgb(charData.colorTransition.oldColor);
                        const newRGB = this.hexToRgb(charData.colorTransition.newColor);
                        
                        const r = Math.round(oldRGB.r + (newRGB.r - oldRGB.r) * progress);
                        const g = Math.round(oldRGB.g + (newRGB.g - oldRGB.g) * progress);
                        const b = Math.round(oldRGB.b + (newRGB.b - oldRGB.b) * progress);
                        
                        currentColor = `rgb(${r}, ${g}, ${b})`;
                        
                        // 전환 중 살짝 밝게 (깜빡임 효과)
                        brightness *= (1 + Math.sin(progress * Math.PI) * 0.3);
                    } else {
                        // 전환 완료
                        charData.currentColor = charData.colorTransition.newColor;
                        delete charData.colorTransition;
                    }
                }
                
                this.ctx.fillStyle = currentColor + Math.floor(brightness * 255).toString(16).padStart(2, '0');
                
                // 한글 단어는 세로쓰기로 표시 + 영문 번역
                if (charData.isKoreanWord) {
                    this.ctx.save();
                    this.ctx.font = `${this.settings.fontSize * 0.9}px ${this.settings.fontFamily}`;
                    
                    // 세로쓰기: 각 글자를 세로로 배치 (각 글자별 색상 적용)
                    const word = charData.char;
                    let totalHeight = 0;
                    for (let k = 0; k < word.length; k++) {
                        const charY = y + (k * this.settings.fontSize * 0.85);
                        // 화면 범위 체크
                        if (charY > 0 && charY < this.canvas.height + this.settings.fontSize) {
                            // 각 글자별 색상 전환 처리
                            let charColor = currentColor;
                            let charBrightness = brightness;
                            
                            if (charData.charColorTransitions && charData.charColorTransitions[k]) {
                                const transition = charData.charColorTransitions[k];
                                const elapsed = Date.now() - transition.startTime;
                                const progress = Math.min(elapsed / transition.duration, 1);
                                
                                if (progress < 1) {
                                    // 각 글자별 색상 보간
                                    const oldRGB = this.hexToRgb(transition.oldColor);
                                    const newRGB = this.hexToRgb(transition.newColor);
                                    
                                    const r = Math.round(oldRGB.r + (newRGB.r - oldRGB.r) * progress);
                                    const g = Math.round(oldRGB.g + (newRGB.g - oldRGB.g) * progress);
                                    const b = Math.round(oldRGB.b + (newRGB.b - oldRGB.b) * progress);
                                    
                                    charColor = `rgb(${r}, ${g}, ${b})`;
                                    charBrightness *= (1 + Math.sin(progress * Math.PI) * 0.5); // 깜빡임 효과
                                } else {
                                    // 전환 완료 - 현재 색상 저장
                                    if (!charData.currentCharColors) {
                                        charData.currentCharColors = [];
                                    }
                                    charData.currentCharColors[k] = transition.newColor;
                                    delete charData.charColorTransitions[k];
                                }
                            } else {
                                // 전환 중이 아닐 때는 저장된 색상 사용 (각 글자별로 다를 수 있음)
                                if (charData.currentCharColors && charData.currentCharColors[k]) {
                                    charColor = charData.currentCharColors[k];
                                }
                            }
                            
                            this.ctx.fillStyle = charColor + Math.floor(charBrightness * 255).toString(16).padStart(2, '0');
                            this.ctx.fillText(word[k], x, charY);
                        }
                        totalHeight = charY;
                    }
                    
                    // 영문 번역을 한글 단어 아래에 추가 (약간 더 작게)
                    if (charData.englishText && totalHeight > 0 && totalHeight < this.canvas.height - this.settings.fontSize) {
                        this.ctx.font = `${this.settings.fontSize * 0.6}px ${this.settings.fontFamily}`;
                        const englishY = totalHeight + this.settings.fontSize * 0.8;
                        if (englishY < this.canvas.height) {
                            // 영문은 약간 투명하게 (현재 색상 사용)
                            const currentAlpha = this.ctx.fillStyle;
                            this.ctx.fillStyle = currentColor + Math.floor(brightness * 0.7 * 255).toString(16).padStart(2, '0');
                            this.ctx.fillText(charData.englishText, x - 5, englishY);
                            this.ctx.fillStyle = currentAlpha;
                        }
                    }
                    
                    this.ctx.restore();
                } else {
                    this.ctx.fillText(charData.char, x, y);
                }
                
                // 랜덤하게 문자 변경
                if (Math.random() < 0.015) { // 변경 빈도 약간 줄임
                    if (charData.isKoreanWord) {
                        const wordObj = this.koreanWordsWithEnglish[Math.floor(Math.random() * this.koreanWordsWithEnglish.length)];
                        charData.char = wordObj.ko;
                        charData.englishText = wordObj.en;
                    } else {
                        charData.char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    }
                }
            }
            
            // 떨어지는 속도 적용 (0일 때는 멈춤)
            if (this.settings.speed > 0) {
                drop.y += drop.speed * (this.settings.speed / 5);
            }
            
            // 화면 아래로 벗어나면 위로 리셋
            if (drop.y > this.canvas.height + drop.chars.length * this.settings.fontSize) {
                drop.y = -drop.chars.length * this.settings.fontSize;
                drop.speed = Math.random() * this.settings.speed + 1;
            }
        }
        
        // 마우스 효과 그리기
        this.drawMouseEffects();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawMouseEffects() {
        this.mouseEffects.forEach((effect, index) => {
            switch (effect.type) {
                case 'ripple':
                    this.drawRipple(effect);
                    break;
                case 'explosion':
                    this.drawExplosion(effect);
                    break;
                case 'freeze':
                    this.drawFreeze(effect);
                    break;
            }
            
            effect.age++;
            if (effect.age > effect.maxAge) {
                this.mouseEffects.splice(index, 1);
            }
        });
    }
    
    drawRipple(effect) {
        const progress = effect.age / effect.maxAge;
        const radius = progress * 100;
        const opacity = 1 - progress;
        
        this.ctx.strokeStyle = this.colors[this.settings.color] + Math.floor(opacity * 100).toString(16).padStart(2, '0');
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    
    drawExplosion(effect) {
        const progress = effect.age / effect.maxAge;
        const particles = effect.particles || [];
        
        if (particles.length === 0) {
            // 파티클 생성
            for (let i = 0; i < 20; i++) {
                particles.push({
                    x: effect.x,
                    y: effect.y,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    char: Math.random() < 0.25 ? 
                        this.koreanWordsWithEnglish[Math.floor(Math.random() * this.koreanWordsWithEnglish.length)].ko :
                        this.chars[Math.floor(Math.random() * this.chars.length)]
                });
            }
            effect.particles = particles;
        }
        
        this.ctx.font = `${this.settings.fontSize}px ${this.settings.fontFamily}`;
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            const opacity = 1 - progress;
            this.ctx.fillStyle = this.colors[this.settings.color] + Math.floor(opacity * 255).toString(16).padStart(2, '0');
            
            // 한글 단어인 경우 세로쓰기로 표시
            if (particle.char.length > 1 && /[가-힣]/.test(particle.char)) {
                this.ctx.save();
                this.ctx.font = `${this.settings.fontSize * 0.9}px ${this.settings.fontFamily}`;
                for (let k = 0; k < particle.char.length; k++) {
                    this.ctx.fillText(particle.char[k], particle.x, particle.y + (k * this.settings.fontSize * 0.8));
                }
                this.ctx.restore();
            } else {
                this.ctx.fillText(particle.char, particle.x, particle.y);
            }
        });
    }
    
    drawFreeze(effect) {
        const progress = effect.age / effect.maxAge;
        const radius = 50;
        const opacity = Math.max(0, 1 - progress);
        
        // 주변 영역에 얼음 효과
        this.ctx.fillStyle = `rgba(173, 216, 230, ${opacity * 0.3})`;
        this.ctx.beginPath();
        this.ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 주변 drops 속도 감소
        for (let i = 0; i < this.drops.length; i++) {
            const dropX = i * this.settings.fontSize;
            const distance = Math.sqrt((dropX - effect.x) ** 2 + (this.drops[i].y - effect.y) ** 2);
            
            if (distance < radius) {
                this.drops[i].speed *= 0.1; // 속도 크게 감소
            }
        }
    }
    
    setupEventListeners() {
        // 윈도우 리사이즈 - 디바운싱 적용
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.resizeCanvas();
                this.updateCanvasSettings();
            }, 100);
        });
        
        // 마우스 이벤트
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.settings.mouseEffect !== 'none') {
                // 이전 효과가 너무 많으면 제거
                if (this.mouseEffects.length > 5) {
                    this.mouseEffects.shift();
                }
                
                this.mouseEffects.push({
                    type: this.settings.mouseEffect,
                    x: e.clientX,
                    y: e.clientY,
                    age: 0,
                    maxAge: this.settings.mouseEffect === 'freeze' ? 120 : 60
                });
            }
        });
        
        // 설정 패널 토글
        const toggleBtn = document.getElementById('toggleBtn');
        const settingsPanel = document.getElementById('settingsPanel');
        
        toggleBtn.addEventListener('click', () => {
            settingsPanel.classList.toggle('collapsed');
            toggleBtn.textContent = settingsPanel.classList.contains('collapsed') ? '▶' : '◀';
        });
        
        // 폰트 변경
        document.getElementById('fontSelect').addEventListener('change', (e) => {
            this.settings.fontFamily = e.target.value;
            
            // 제목과 메시지에도 폰트 적용
            const titleElement = document.getElementById('errorTitle');
            const messageElement = document.getElementById('errorMessage');
            
            if (titleElement) {
                titleElement.style.fontFamily = e.target.value;
            }
            if (messageElement) {
                messageElement.style.fontFamily = e.target.value;
            }
        });
        
        // 폰트 크기 변경 - 애니메이션 유지
        const fontSizeSlider = document.getElementById('fontSizeSlider');
        const fontSizeValue = document.getElementById('fontSizeValue');
        let fontSizeTimeout;
        
        fontSizeSlider.addEventListener('input', (e) => {
            this.settings.fontSize = parseInt(e.target.value);
            fontSizeValue.textContent = e.target.value;
            
            clearTimeout(fontSizeTimeout);
            fontSizeTimeout = setTimeout(() => {
                this.updateCanvasSettings();
            }, 50);
        });
        
        // 속도 변경
        const speedSlider = document.getElementById('speedSlider');
        const speedValue = document.getElementById('speedValue');
        
        speedSlider.addEventListener('input', (e) => {
            this.settings.speed = parseInt(e.target.value);
            speedValue.textContent = e.target.value;
        });
        
        // 색상 변경
        const colorBtns = document.querySelectorAll('.color-btn');
        colorBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.settings.color = btn.dataset.color;
                this.updateTheme();
            });
        });
        
        // 마우스 효과 변경
        document.getElementById('mouseEffectSelect').addEventListener('change', (e) => {
            this.settings.mouseEffect = e.target.value;
        });
        
        // 캔버스 크기 변경
        document.getElementById('canvasSizeSelect').addEventListener('change', (e) => {
            this.settings.canvasSize = e.target.value;
            setTimeout(() => {
                this.handleCanvasSizeChange();
            }, 50);
        });
        
        // 사용자 입력 텍스트 실시간 반영
        document.getElementById('titleInput').addEventListener('input', (e) => {
            const titleElement = document.getElementById('errorTitle');
            const newText = e.target.value || '404';
            
            // span으로 분할되어 있다면 원래 텍스트로 복원
            if (titleElement.querySelector('span')) {
                titleElement.innerHTML = newText;
            } else {
                titleElement.textContent = newText;
            }
        });
        
        document.getElementById('messageInput').addEventListener('input', (e) => {
            const messageElement = document.getElementById('errorMessage');
            const newText = e.target.value || "You've been disconnected from the Matrix";
            
            // span으로 분할되어 있다면 원래 텍스트로 복원
            if (messageElement.querySelector('span')) {
                messageElement.innerHTML = newText;
            } else {
                messageElement.textContent = newText;
            }
        });
    }
    
    // UI 요소들을 위에서 아래로 순차적으로 색상 변경
    animateUIColors() {
        const newColor = this.colors[this.settings.color];
        
        // UI 요소들을 위에서 아래 순서로 정렬
        const uiElements = [
            // 설정 패널 헤더
            { element: document.querySelector('.settings-header h3'), delay: 0 },
            { element: document.querySelector('.toggle-btn'), delay: 100 },
            
            // 설정 그룹들 (위에서 아래 순서)
            ...Array.from(document.querySelectorAll('.setting-group')).map((el, index) => ({
                element: el,
                delay: 200 + (index * 150)
            })),
            
            // 텍스트 입력 섹션
            { element: document.querySelector('.section-title'), delay: 200 + (document.querySelectorAll('.setting-group').length * 150) },
            ...Array.from(document.querySelectorAll('.text-input-section .input-group')).map((el, index) => ({
                element: el,
                delay: 350 + (document.querySelectorAll('.setting-group').length * 150) + (index * 150)
            })),
            
            // 리턴 버튼 (마지막)
            { element: document.querySelector('.return-btn'), delay: 500 + (document.querySelectorAll('.setting-group').length * 150) + (document.querySelectorAll('.text-input-section .input-group').length * 150) }
        ];
        
        // 각 요소를 순차적으로 색상 변경
        uiElements.forEach(({ element, delay }) => {
            if (!element) return;
            
            setTimeout(() => {
                // 요소 타입에 따른 색상 적용
                this.applyColorToElement(element, newColor);
                
                // 깜빡임 효과
                element.style.animation = 'uiGlow 0.6s ease-in-out';
                setTimeout(() => {
                    element.style.animation = '';
                }, 600);
            }, delay);
        });
    }
    
    // 요소 타입에 따라 적절한 색상 속성 적용
    applyColorToElement(element, color) {
        const tagName = element.tagName.toLowerCase();
        const className = element.className;
        
        // 텍스트 요소들
        if (tagName === 'h3' || element.classList.contains('section-title') || tagName === 'label') {
            element.style.color = color;
            element.style.transition = 'color 0.8s ease';
        }
        
        // 버튼들
        else if (element.classList.contains('toggle-btn') || element.classList.contains('return-btn')) {
            element.style.borderColor = color;
            element.style.color = color;
            element.style.transition = 'border-color 0.8s ease, color 0.8s ease';
        }
        
        // 입력 필드들과 셀렉트
        else if (tagName === 'input' || tagName === 'select') {
            element.style.borderColor = color;
            element.style.color = color;
            element.style.transition = 'border-color 0.8s ease, color 0.8s ease';
        }
        
        // 설정 그룹 전체
        else if (element.classList.contains('setting-group') || element.classList.contains('input-group')) {
            // 그룹 내의 모든 자식 요소들에 색상 적용
            const labels = element.querySelectorAll('label');
            const inputs = element.querySelectorAll('input, select');
            const spans = element.querySelectorAll('span');
            
            labels.forEach(label => {
                label.style.color = color;
                label.style.transition = 'color 0.8s ease';
            });
            
            inputs.forEach(input => {
                input.style.borderColor = color;
                input.style.color = color;
                input.style.transition = 'border-color 0.8s ease, color 0.8s ease';
            });
            
            spans.forEach(span => {
                span.style.color = color;
                span.style.transition = 'color 0.8s ease';
            });
        }
    }
    
    // 제목과 메시지의 색상을 파도처럼 변경
    animateMessageColors() {
        const titleElement = document.getElementById('errorTitle');
        const messageElement = document.getElementById('errorMessage');
        
        if (!titleElement || !messageElement) return;
        
        const titleText = titleElement.textContent;
        const messageText = messageElement.textContent;
        
        // 제목 글자별 span으로 분할
        titleElement.innerHTML = '';
        for (let i = 0; i < titleText.length; i++) {
            const span = document.createElement('span');
            span.textContent = titleText[i];
            span.style.transition = 'color 0.8s ease';
            titleElement.appendChild(span);
        }
        
        // 메시지 글자별 span으로 분할
        messageElement.innerHTML = '';
        for (let i = 0; i < messageText.length; i++) {
            const span = document.createElement('span');
            span.textContent = messageText[i];
            span.style.transition = 'color 0.8s ease';
            messageElement.appendChild(span);
        }
        
        // 제목 글자들을 순차적으로 색상 변경 (빠른 파도)
        const titleSpans = titleElement.querySelectorAll('span');
        titleSpans.forEach((span, index) => {
            setTimeout(() => {
                span.style.color = this.colors[this.settings.color];
                span.style.textShadow = `0 0 20px ${this.colors[this.settings.color]}`;
                
                // 깜빡임 효과
                span.style.animation = 'titleGlow 0.6s ease-in-out';
                setTimeout(() => {
                    span.style.animation = '';
                }, 600);
            }, index * 100); // 각 글자마다 100ms 간격
        });
        
        // 메시지 글자들을 순차적으로 색상 변경 (조금 더 느린 파도)
        const messageSpans = messageElement.querySelectorAll('span');
        messageSpans.forEach((span, index) => {
            setTimeout(() => {
                span.style.color = this.colors[this.settings.color];
                
                // 공백은 건너뛰고 실제 글자만 깜빡임
                if (span.textContent.trim()) {
                    span.style.animation = 'messageGlow 0.8s ease-in-out';
                    setTimeout(() => {
                        span.style.animation = '';
                    }, 800);
                }
            }, (titleText.length * 100) + (index * 80)); // 제목이 끝난 후 시작, 80ms 간격
        });
    }
    
    // 헥스 색상을 RGB로 변환하는 헬퍼 함수
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {r: 0, g: 255, b: 0}; // 기본값 green
    }
    
    handleCanvasSizeChange() {
        const canvas = this.canvas;
        const container = canvas.parentElement;
        
        switch (this.settings.canvasSize) {
            case 'fullscreen':
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                this.resizeCanvas();
                this.updateCanvasSettings();
                break;
            case 'fixed':
                canvas.style.width = '800px';
                canvas.style.height = '600px';
                canvas.width = 800;
                canvas.height = 600;
                this.updateCanvasSettings();
                break;
            case 'custom':
                const width = prompt('가로 크기를 입력하세요 (px):', '1024');
                const height = prompt('세로 크기를 입력하세요 (px):', '768');
                if (width && height) {
                    canvas.style.width = width + 'px';
                    canvas.style.height = height + 'px';
                    canvas.width = parseInt(width);
                    canvas.height = parseInt(height);
                    this.updateCanvasSettings();
                }
                break;
        }
    }
    
    // 언어 토글 설정
    setupLanguageToggle() {
        const langBtns = document.querySelectorAll('.lang-btn');
        
        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 모든 버튼에서 active 클래스 제거
                langBtns.forEach(b => b.classList.remove('active'));
                
                // 클릭된 버튼에 active 클래스 추가
                btn.classList.add('active');
                
                // 언어 설정 변경
                this.currentLanguage = btn.dataset.lang;
                
                // 언어 업데이트
                this.updateLanguage();
            });
        });
    }
    
    // 언어 업데이트
    updateLanguage() {
        const elements = document.querySelectorAll('[data-lang-key]');
        
        elements.forEach(element => {
            const key = element.dataset.langKey;
            const translation = this.translations[this.currentLanguage][key];
            
            if (translation) {
                // input의 placeholder나 value는 따로 처리
                if (element.tagName === 'INPUT') {
                    if (element.type === 'text') {
                        // 제목과 메시지 입력 필드의 기본값 설정
                        if (key === 'error_message' && element.id === 'messageInput') {
                            element.value = translation;
                            // 실제 메시지도 업데이트
                            const messageElement = document.getElementById('errorMessage');
                            if (messageElement) {
                                messageElement.textContent = translation;
                            }
                        }
                    }
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // 404 메시지 입력 필드 기본값도 업데이트
        const messageInput = document.getElementById('messageInput');
        const errorMessageElement = document.getElementById('errorMessage');
        
        if (messageInput && errorMessageElement) {
            const errorMessage = this.translations[this.currentLanguage]['error_message'];
            
            // 현재 입력값이 기본값인 경우에만 업데이트
            const koDefault = this.translations['ko']['error_message'];
            const enDefault = this.translations['en']['error_message'];
            
            if (messageInput.value === koDefault || messageInput.value === enDefault) {
                messageInput.value = errorMessage;
                errorMessageElement.textContent = errorMessage;
            }
        }
    }
}

// 페이지 로드 시 Matrix 효과 시작
document.addEventListener('DOMContentLoaded', () => {
    new MatrixRain();
});