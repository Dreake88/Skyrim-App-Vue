let app = new Vue({
    el: ".main",
    data: {
        showMain: true,
        showSocial: false,
        showAchivments: false,
        showQuestions: false,
        showResult: false,
        number: 0,
        score: {
            "bb": 0,
            "imperial": 0,
            "winterhold": 0,
            "thieves": 0,
            "rassvet": 0,
            "vampire": 0,
            "tb": 0,
        },
        totalGame: localStorage.getItem('skyrimTotalGame') ? JSON.parse(localStorage.getItem('skyrimTotalGame')) : {
            "bb": 0,
            "imperial": 0,
            "winterhold": 0,
            "thieves": 0,
            "rassvet": 0,
            "vampire": 0,
            "tb": 0,
        },
        totalGames: localStorage.getItem('skyrimTotalGames') ? localStorage.getItem('skyrimTotalGames') : 0,
        questions: questions,
        results: results,
        resultFraction: 'bb',
    },
    methods: {
        goToMain() {
            this.showMain = true
            this.showSocial = false
            this.showAchivments = false
            this.showQuestions = false
            this.showResult = false
        },
        goToSocial() {
            this.showMain = false
            this.showSocial = true
            this.showAchivments = false
            this.showQuestions = false
            this.showResult = false
        },
        goToAchivments() {
            if(this.totalGames > 0) {
            this.showMain = false
            this.showSocial = false
            this.showAchivments = true
            this.showQuestions = false
            this.showResult = false
            } else {
                this.goToQuestions()
            }
        },
        goToQuestions() {
            this.score = {
                "bb": 0,
                "imperial": 0,
                "winterhold": 0,
                "thieves": 0,
                "rassvet": 0,
                "vampire": 0,
                "tb": 0,
            }
            this.showMain = false
            this.showSocial = false
            this.showAchivments = false
            this.showQuestions = true
            this.showResult = false
        },
        goToResults(fraction) {
            this.showMain = false
            this.showSocial = false
            this.showAchivments = false
            this.showQuestions = false
            this.showResult = true
            this.resultFraction = fraction
        },
        nextQuestions(answer) {
            if(this.number == 5) {
                this.number = 0
                this.endGame();
            } else {
                this.number++
            }
            eval(answer)
        },
        endGame() {
            this.totalGames++;
            localStorage.setItem('skyrimTotalGames', this.totalGames)
            //Братья Бури
            if(this.score.bb > this.score.imperial && 
                this.score.bb > this.score.winterhold && 
                this.score.bb > this.score.thieves && 
                this.score.bb > this.score.rassvet && 
                this.score.bb > this.score.vampire && 
                this.score.bb > this.score.tb) {
                this.goToResults('bb')
                this.totalGame.bb++
            }
            //Имперский легион
            else if (this.score.imperial > this.score.bb && 
                    this.score.imperial > this.score.winterhold && 
                    this.score.imperial > this.score.thieves && 
                    this.score.imperial > this.score.rassvet && 
                    this.score.imperial > this.score.vampire && 
                    this.score.imperial > this.score.tb) {
                this.goToResults('imperial')
                this.totalGame.imperial++
            }
            //Коллегия Винтерхолда
            else if (this.score.winterhold > this.score.bb &&
                    this.score.winterhold > this.score.imperial && 
                    this.score.winterhold > this.score.thieves && 
                    this.score.winterhold > this.score.rassvet && 
                    this.score.winterhold > this.score.vampire && 
                    this.score.winterhold > this.score.tb) {
                this.goToResults('winterhold')
                this.totalGame.winterhold++
            }
            //Гильдия Воров
            else if (this.score.thieves > this.score.bb &&
                    this.score.thieves > this.score.winterhold &&
                    this.score.thieves > this.score.imperial && 
                    this.score.thieves > this.score.rassvet && 
                    this.score.thieves > this.score.vampire && 
                    this.score.thieves > this.score.tb) {
                this.goToResults('thieves')
                this.totalGame.thieves++
            }
            //Стража Рассвета
            else if (this.score.rassvet > this.score.bb && 
                    this.score.rassvet > this.score.winterhold && 
                    this.score.rassvet > this.score.thieves && 
                    this.score.rassvet > this.score.imperial && 
                    this.score.rassvet > this.score.vampire && 
                    this.score.rassvet > this.score.tb) {
                this.goToResults('rassvet')
                this.totalGame.rassvet++
            }
            //Клан Волкихар
            else if (this.score.vampire > this.score.bb && 
                    this.score.vampire > this.score.winterhold && 
                    this.score.vampire > this.score.thieves && 
                    this.score.vampire > this.score.rassvet && 
                    this.score.vampire > this.score.imperial && 
                    this.score.vampire > this.score.tb) {
                this.goToResults('vampire')
                this.totalGame.vampire++
            }
            //Темное братство
            else if (this.score.tb > this.score.bb && 
                     this.score.tb > this.score.winterhold && 
                     this.score.tb > this.score.thieves && 
                     this.score.tb > this.score.rassvet && 
                     this.score.tb > this.score.vampire && 
                     this.score.tb > this.score.imperial) {
                this.goToResults('tb')
                this.totalGame.tb++
            }
            else {
                this.goToResults('bb')
                this.totalGame.bb++
            }

            localStorage.setItem('skyrimTotalGame', JSON.stringify(this.totalGame))
        }
    },
    computed: {
        totalScore() {
            let score=0
            for(let i in this.totalGame) {
                score+=(this.totalGame[i]*results[i].points)
            }
            return score
        },
        openFraction() {
            let count=0
            for(let i in this.totalGame) {
                if(this.totalGame[i]>0) count++
            }
            return count
        },
        favoriteFraction() {
            let max='bb'
            for(let i in this.totalGame) {
                if(this.totalGame[i]>this.totalGame[max]) {
                    max=i
                }
            }
            return results[max].name
        },
        showResultFraction() {
            return {
                'bb': this.totalGame.bb > 0 ? true : false,
                'imperial': this.totalGame.imperial > 0 ? true : false,
                'winterhold': this.totalGame.winterhold > 0 ? true : false,
                'thieves': this.totalGame.thieves > 0 ? true : false,
                'rassvet': this.totalGame.rassvet > 0 ? true : false,
                'vampire': this.totalGame.vampire > 0 ? true : false,
                'tb': this.totalGame.tb > 0 ? true : false,
            }
        }
    }
}
)

let audio = new Audio('../audio/soundtrack.mp3')
let audio_btn = document.querySelector('.btn__sound')
let audio_icon = document.querySelector('.btn__sound i')

audio.muted = true;
audio.autoplay = true;
audio.volume = 0.2

audio.addEventListener('loadmetadata', function() {
    audio.currentTime = 0 + Math.random() * (audio.duration + 1 - 0)
})

audio_btn.addEventListener('click', function() {
    if(audio.muted) {
        audio.muted = false
        audio_icon.classList.add('fa-volume-up')
        audio_icon.classList.remove('fa-volime-off')
    } else if(!audio.muted) {
        audio.muted = true
        audio_icon.classList.add('fa-volume-off')
        audio_icon.classList.remove('fa-volume-up')
    }
})