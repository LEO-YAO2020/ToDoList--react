
        var fir = document.querySelector("#cball")
        var all = document.querySelectorAll("input")
        fir.onclick = function () {
            for (let i = 0; i < all.length; i++) {
                all[i].checked = this.checked
            }
        }
        for (let i = 0; i < all.length; i++) {
            all[i].onclick = function () {
                var flag = true;
                for (let j = 0; j < all.length; j++) {
                    if (!all[j].checked) {
                        flag = false;
                    }
                }
                all.checked = flag
            }
        }


