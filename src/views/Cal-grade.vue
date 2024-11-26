<template>
    <div>
        <NavBar />
        <div class="grade-container">
            <div class="grade-card">
                <div class="card-header">
                    <h2>✨ Grade Calculator ✨</h2>
                </div>
                <div class="card-body">
                    <div class="input-group">
                        <label>Enter Score (0-100)</label>
                        <input type="text" class="score-input" v-model="score" placeholder="Enter your score">
                    </div>
                    <button class="calculate-btn" @click="calculateGrade">
                        Calculate Grade
                    </button>

                    <div v-if="grade" class="result success">
                        <h3>Your Grade: <span class="grade-text">{{ grade }}</span></h3>
                    </div>

                    <div v-if="error" class="result error">
                        {{ error }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
    name: 'cal-grade',
    components: {
        NavBar
    },
    data() {
        return {
            score: '',
            grade: '',
            error: ''
        }
    },
    methods: {
        calculateGrade() {
            this.grade = ''
            this.error = ''
            const scoreNum = Number(this.score)

            if (isNaN(scoreNum) || this.score.trim() === '') {
                this.error = 'Please enter a valid number'
                return
            }

            if (scoreNum < 0 || scoreNum > 100) {
                this.error = 'Score must be between 0 and 100'
                return
            }

            if (scoreNum >= 80 && scoreNum <= 100) {
                this.grade = 'A'
            } else if (scoreNum >= 70 && scoreNum <= 79) {
                this.grade = 'B'
            } else if (scoreNum >= 60 && scoreNum <= 69) {
                this.grade = 'C'
            } else if (scoreNum >= 50 && scoreNum <= 59) {
                this.grade = 'D'
            } else {
                this.grade = 'F'
            }
        }
    }
}
</script>

<style scoped>
.grade-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
}

.grade-card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    overflow: hidden;
}

.card-header {
    background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
    color: white;
    padding: 20px;
    text-align: center;
}

.card-header h2 {
    margin: 0;
    font-size: 24px;
}

.card-body {
    padding: 30px;
}

.input-group {
    margin-bottom: 20px;
}

.input-group label {
    display: block;
    margin-bottom: 8px;
    color: #666;
    font-weight: 500;
}

.score-input {
    width: 100%;
    padding: 12px;
    border: 2px solid #e1e1e1;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s;
}

.score-input:focus {
    border-color: #6B73FF;
    outline: none;
}

.calculate-btn {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
}

.calculate-btn:hover {
    transform: translateY(-2px);
}

.result {
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
}

.success {
    background: #e7f7ef;
    color: #1d6f42;
}

.error {
    background: #ffebee;
    color: #c62828;
}

.grade-text {
    font-size: 32px;
    font-weight: bold;
    color: #000DFF;
}
</style>