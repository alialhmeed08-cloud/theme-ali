import "lite-youtube-embed";
import BasePage from "./base-page";
import Lightbox from "fslightbox";
window.fslightbox = Lightbox;

// PhoneX partials
import { initCountdown } from "./partials/phonenx-countdown";
import { initThemeToggle } from "./partials/phonenx-theme-toggle";
import { initScrollEffects } from "./partials/phonenx-scroll";

class Home extends BasePage {
    onReady() {
        this.initFeaturedTabs();   // theme-raed original (tabs for featured products)
        this.initPhoneX();          // PhoneX signature effects
    }

    /**
     * theme-raed original — used in views/components/home/featured-products-style*.twig
     * Kept EXACTLY as in theme-raed (do not modify).
     */
    initFeaturedTabs() {
        app.all('.tab-trigger', el => {
            el.addEventListener('click', ({ currentTarget: btn }) => {
                let id = btn.dataset.componentId;
                app.toggleClassIf(`#${id} .tabs-wrapper>div`, 'is-active opacity-0 translate-y-3', 'inactive', tab => tab.id == btn.dataset.target)
                    .toggleClassIf(`#${id} .tab-trigger`, 'is-active', 'inactive', tabBtn => tabBtn == btn);

                // fadeIn active tab
                setTimeout(() => app.toggleClassIf(`#${id} .tabs-wrapper>div`, 'opacity-100 translate-y-0', 'opacity-0 translate-y-3', tab => tab.id == btn.dataset.target), 100);
            })
        });
        document.querySelectorAll('.s-block-tabs').forEach(block => block.classList.add('tabs-initialized'));
    }

    /**
     * PhoneX signature interactive effects.
     */
    initPhoneX() {
        initThemeToggle(document);
        initScrollEffects(document);
        initCountdown(document);
    }
}

Home.initiateWhenReady(['index']);