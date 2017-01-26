var app = {
    inicio: function() {
        this.iniciaBotones();
        this.iniciaFastClick();
        this.iniciaHammer();     
    },

    iniciaFastClick: function(){
        FastClick.attach(document.body);    // Ponemos FastClick al body
    },

    iniciaBotones: function(){
        var botonClaro = document.querySelector('#claro');
        var botonOscuro = document.querySelector('#oscuro');

        var body = document.querySelector('body');

        body.addEventListener('webkitAnimationEnd', function() {
            document.body.className = '';
        });

        botonClaro.addEventListener('click', this.ponloClaro, false);
        botonOscuro.addEventListener('click', this.ponloOscuro, false);
    },

    iniciaHammer: function(){
        var zona = document.getElementById('zona-gestos');
        var hammertime = new Hammer(zona);

        hammertime.get('pinch').set({ enable: true});       // Los manejadores de eventos de estos dos no se activan por defecto
        hammertime.get('rotate').set({ enable: true});
/*
        hammertime.on('tap doubletap pan swipe press pinch rotate', function(ev) {      // En vez de swipe, se realiza pan y
            document.querySelector('#info').innerHTML = ev.type + "!";                  // en vez de rotate, se realiza pinch
        });       
*/                                                                             // Puede comprobarse eliminando pan o pinch

        zona.addEventListener('webkitAnimationEnd', function(e) {   // Quitamos la animación cuando termina la anterior
            zona.className = '';
        });

        hammertime.on('tap', function(ev) {
            zona.className = 'tap';
        });

        hammertime.on('doubletap', function(ev) {
            zona.className = 'doubletap';
        });

        hammertime.on('press', function(ev) {
            zona.className = 'press';
        });

        hammertime.on('swipe', function(ev) {
            var clase = undefined;
            direccion = ev.direction;

            if (direccion == 4) {
                clase = 'swipe-derecha';
            };
            if (direccion == 2) {
                clase = 'swipe-izquierda'
            };
            zona.className = clase;
        });

        hammertime.on('rotate', function(ev) {
            var umbral = 25;
            if (ev.distance > umbral) {
                zona.className = 'rotate';
            }
        });
    },

    ponloClaro: function() {
        document.body.className = 'claro';
    },

    ponloOscuro: function() {
        document.body.className = 'oscuro';
    }
};

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {      // Todos los ficheros cargados  
        app.inicio();
    }, false);
}
