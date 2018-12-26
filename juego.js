console.log('No voy a bloquear el event loop')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')


const titleLevel = document.getElementById('level')
const scoreLevel = document.getElementById('score')
const topScoreLevel = document.getElementById('top-score')

const btnEmpezar = document.getElementById('btnEmpezar')

const LAST_LEVEL = 10
var topScore = 0

class Juego{
    constructor(){
        this.inicialize = this.inicialize.bind(this)
        this.inicialize()
        this.generateSecuence()
        setTimeout(() => this.nextLevel(), 500);
        
    }

    inicialize(){
        this.selectColor = this.selectColor.bind(this) //hace que el contexto de selectColor siempre sea el mismo , estando atado al contexto del juego donde this es el juego
        this.toggleBtnEmpezar()
        this.level = 1
        this.score = 0
        

        this.setLevelTitle()
        this.setScore()
        this.setTopScore()

        
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde,
        }
    }
    toggleBtnEmpezar(){
        btnEmpezar.classList.toggle('hide')//esto es parte del event loop
        btnEmpezar.classList.toggle('show')//esto es parte del event loop
        btnEmpezar.classList.toggle('wait')//esto es parte del event loop

    }

    generateSecuence(){
    
        this.secuence = new Array(LAST_LEVEL).fill(0).map( n => Math.floor(Math.random() * 4) )
    }

    nextLevel(){
        this.subLevel = 0
        this.iluminateSecuence()
        this.addClickEvents()
    }

    transformNumberToColor(num){
        switch (num) {
            case 0:                
                return 'celeste'

            case 1:
                return 'violeta'
                
            case 2:
                return 'naranja'
                
            case 3:
                return 'verde'

        }
    }
    transformColorToNumber(color) {
        switch (color) {
            case 'celeste':
                return 0

            case 'violeta':
                return 1

            case 'naranja':
                return 2

            case 'verde':
                return 3

        }
    }

    iluminateSecuence(){
        for (let i = 0; i < this.level; i++) {
            const color = this.transformNumberToColor(this.secuence[i]) //se debe usar let para que se mantenga dentro del bloque de ese momento for , de lo contrario si se usa un var el setTimeout terminara usando siempre el ultimo color de la secuencia
            setTimeout(() => this.enlightColor(color), 1000*i);
            
        }
    }

    enlightColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350);
    }

    apagarColor(color){
        this.colores[color].classList.remove('light')
    }
    
    addClickEvents(){

        this.colores.celeste.addEventListener('click', this.selectColor) //el bind se coloca para mantener el contexto the this y hace que el this de esa función sea el mismo que esta
        this.colores.violeta.addEventListener('click', this.selectColor)
        this.colores.verde.addEventListener('click', this.selectColor)
        this.colores.naranja.addEventListener('click', this.selectColor)
    }

    removeClickEvents(){
        this.colores.celeste.removeEventListener('click', this.selectColor) //el bind se coloca para mantener el contexto the this y hace que el this de esa función sea el mismo que esta
        this.colores.violeta.removeEventListener('click', this.selectColor)
        this.colores.verde.removeEventListener('click', this.selectColor)
        this.colores.naranja.removeEventListener('click', this.selectColor)
    }

    selectColor(ev){
        //aquí se pierde el contexto del this volviendose el div al cual se hace click a menos que se haga un bind en el metodo que llama a esta función
        const nombreColor = ev.target.dataset.color
        const numberColor = this.transformColorToNumber(nombreColor)
        this.enlightColor(nombreColor)

        if (numberColor === this.secuence[this.subLevel]) {
            this.subLevel++
            this.score += 100
            this.setScore()
            if (this.level === this.subLevel) {                
                if (this.level === (LAST_LEVEL + 1)) {
                    //Ganó
                    this.wonGame()
                }else{
                    this.finishedLevel()
                }
                this.removeClickEvents()
            }          
        } else {
            //Perdió
            this.lostGame()
        }   
    }

    finishedLevel(){
        swal({
            icon: "success",
            title: "Nivel " + this.level + " Completado",
            button: {
                text: "Seguir: Nivel " + (this.level + 1),
            },
        }).then(() => {
            this.level++
            this.score += 500
            this.setLevelTitle()
            this.setScore()
            this.nextLevel()
        })

    }

    wonGame(){
        swal({
            icon: "success",
            title: "Felicidades , ganaste el juego",
            text: 'Ganaste',
        }).then(this.inicialize)    
    }

    lostGame() {
        swal({
            icon: "error",
            title: "Lo lamentamos Perdiste :(",
            text: 'Perdiste',
        }).then(() => {
            
            this.removeClickEvents()
            this.inicialize()
        })
    }

    setLevelTitle(){
        titleLevel.innerHTML = "Nivel: " + this.level
    } 
    setScore() {
        scoreLevel.innerHTML = "Puntuación: " + this.score
        if (this.score > topScore) {
            topScore = this.score
            this.setTopScore()
        }
    }
    setTopScore() {        
        topScoreLevel.innerHTML = "Puntuación Máxima: " + topScore
    }



}

function empezarJuego() {
    // var juego = new Juego()

    window.juego = new Juego()


}