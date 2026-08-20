module.exports = {
    important: false,
    content: [
        "src/views/**/*.twig",
        "src/assets/js/**/*.js",
    ],
    darkMode: 'class',
    theme   : {
        container : {
            center : true,
            padding: '10px',
            screens: {
                '2xl': "1240px" // PhoneX container width
            }
        },
        fontFamily: {
            sans: [
                'var(--font-main)',
                '-apple-system',
                'BlinkMacSystemFont',
            ],
            primary: "var(--font-main)",
            display: "var(--font-display)" // PhoneX serif display font
        },
        extend    : {
            transitionTimingFunction: {
              'elastic': 'cubic-bezier(.22,1,.36,1)', // PhoneX --ease
            },
            gridTemplateColumns: {
                'auto-fill'  : 'repeat(auto-fill, 290px)',
            },
            colors             : {
                // theme-raed originals
                'dark'         : '#1D1F1F',
                'darker'       : '#0E0F0F',
                'danger'       : '#AE0A0A',
                'primary'         : 'var(--color-primary)',
                'primary-d'       : 'var(--color-primary-dark)',
                'primary-l'       : 'var(--color-primary-light)',
                'primary-reverse' : 'var(--color-primary-reverse)',
                'primary-dark' : 'var(--color-primary-dark)',
                // PhoneX tokens
                'void'  : 'var(--px-void)',
                'coal'  : 'var(--px-coal)',
                'panel' : 'var(--px-panel)',
                'panel2': 'var(--px-panel2)',
                'snow'  : 'var(--px-snow)',
                'ice'   : 'var(--px-ice)',
                'gold'  : 'var(--px-gold)',
            },
            spacing: {
              '3.75': '15px',
              '7.5' : '30px',
              '58'  : '232px',
              '62'  : '248px',
              '100' : '28rem',
              '116' : '464px',
              '132' : '528px',
              '200' : '800px',
            },
            borderRadius       : {
                'large': '22px',   // PhoneX --r
                'big'  : '40px',
                'tiny' : '3px',
                DEFAULT: '.75rem',
            },
            fontSize           : {
                'icon-lg'   : '33px',
                'xxs'       : '10px',
                'xxxs'      : '8px',
                'title-size': '42px',
                '22px'      : '22px',
            },
            lineHeight         : {
                '12': '3rem',
                '14': '3.5rem',
                '16': '4rem',
                '18': '4.5rem',
                '20': '5rem',
            },
            boxShadow          : {
                'default' : '5px 10px 30px #2B2D340D;',
                'top'     : '0px 0px 10px #0000001A;',
                'md'      : '5px 10px 99px #2B2D340D',
                'dropdown': '0 4px 8px rgba(161, 121, 121, 0.07)',
                'light'   : '0px 4px 15px rgba(1, 1, 1, 0.06)',
                'huge'    : '0px 3px 6px #00000029',
                'progress': '0 5px 15px rgba(92, 213, 196, 0.4)',
                'glow-ice': '0 0 24px rgba(0,180,204,.35)',
            },
        },
    },
    plugins: [],
};