tailwind.config = {
    theme: {
        extend: {
            colors: {
                mainblue: "#007090",
                lightblue: "#A3BAC3",
                containerblue: "#ccd9de",
                container2blue: "#b8c3c8",
                btnblue: "#539eb4",
                btn2blue: "#4697af",
                subblack: "#171214",
                offwhite: "#F9F9F9"
            },
            animation: {
                'infinite-scroll': 'infinite-scroll 25s linear infinite',
            },
            keyframes: {
                'infinite-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-100%)' },
                }
            }, 
            fontSize: {
                '4.5xl': '2.6rem',
            }
        },
    }
}