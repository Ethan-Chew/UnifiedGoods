tailwind.config = {
    theme: {
        extend: {
            colors: {
                mainblue: "#007090",
                lightblue: "#A3BAC3",
                btnblue: "#539eb4",
                btn2blue: "#4697af",
                subblack: "#171214"
            },
            animation: {
                'infinite-scroll': 'infinite-scroll 25s linear infinite',
            },
            keyframes: {
                'infinite-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-100%)' },
                }
            }  
        }
    }
}