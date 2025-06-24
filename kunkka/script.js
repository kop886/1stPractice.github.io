document.addEventListener('DOMContentLoaded', () => {
            const tooltipElements = document.querySelectorAll('.ability-icon, .aghanim-icon, .talent-tree-wrapper');
            const mainWrapper = document.querySelector('.main-wrapper'); 

            tooltipElements.forEach(element => {
                const tooltip = element.querySelector('.tooltip, .talent-tree-tooltip');

                if (tooltip) {
                    const originalParent = tooltip.parentNode;

                    element.addEventListener('mouseenter', () => {
                        mainWrapper.appendChild(tooltip);

                        const elementRect = element.getBoundingClientRect();
                        const containerRect = mainWrapper.getBoundingClientRect();

                        let top = elementRect.top - containerRect.top + elementRect.height + 10;
                        let left = elementRect.left - containerRect.left + (elementRect.width / 2);

                        tooltip.style.display = 'block';
                        const tooltipRect = tooltip.getBoundingClientRect();

                        left = left - (tooltipRect.width / 2);

                        
                        if (element.classList.contains('talent-tree-wrapper') || element.classList.contains('aghanim-icon')) {
                            left = elementRect.right - containerRect.left + 10;
                            
                            if (left + tooltipRect.width > containerRect.width) {
                                left = (elementRect.left - containerRect.left) - tooltipRect.width - 10;
                            }
                        }

                        if (left < 0) {
                            left = 0;
                        }
                        if (left + tooltipRect.width > containerRect.width) {
                            left = containerRect.width - tooltipRect.width;
                        }

                        if (top + tooltipRect.height > containerRect.height && elementRect.top - containerRect.top - tooltipRect.height - 10 > 0) {
                            top = (elementRect.top - containerRect.top) - tooltipRect.height - 10;
                        } else if (top + tooltipRect.height > containerRect.height) {
                            top = containerRect.height - tooltipRect.height;
                            if (top < 0) top = 0;
                        }

                        tooltip.style.top = `${top}px`;
                        tooltip.style.left = `${left}px`;
                        tooltip.style.position = 'absolute';
                    });

                    element.addEventListener('mouseleave', () => {
                        tooltip.style.display = 'none';
                        originalParent.appendChild(tooltip);
                    });
                }
            });

            
            window.toggleStory = function(event, showFull) {
                event.preventDefault(); // Prevent link from jumping
                const shortStory = document.getElementById('short-story');
                const fullStory = document.getElementById('full-story');

                if (showFull) {
                    shortStory.style.display = 'none';
                    fullStory.style.display = 'block';
                } else {
                    fullStory.style.display = 'none';
                    shortStory.style.display = 'block';
                }
            };

            
            const heroPaths = [
                "alchemist/alchemist.html",
                "axe/axe.html",
                "bristleback/bristleback.html",
                "centaur/centaur.html",
                "chaos_knight/chaos_knight.html",
                "clockwerk/clockwerk.html",
                "dawnbreaker/dawnbreaker.html",
                "doom/doom.html",
                "dragon_knight/dragon_knight.html",
                "earth_spirit/earth_spirit.html",
                "earthshaker/earthshaker.html",
                "elder_titan/elder_titan.html",
                "huskar/huskar.html",
                "kunkka/kunkka.html",
                "legion_commander/legion_commander.html",
                "lifestealer/lifestealer.html",
                "lycan/lycan.html", // 
                "mars/mars.html",
                "night_stalker/night_stalker.html",
                "ogre_magi/ogre_magi.html",
                "omniknight/omniknight.html",
                "phoenix/phoenix.html",
                "primal_beast/primal_beast.html",
                "pudge/pudge.html",
                "slardar/slardar.html",
                "spirit_breaker/spirit_breaker.html",
                "sven/sven.html",
                "tidehunter/tidehunter.html",
                "timbersaw/timbersaw.html",
                "tiny/tiny.html",
                "treant/treant.html",
                "tusk/tusk.html",
                "underlord/underlord.html",
                "undying/undying.html",
                "wraith_king/wraith_king.html"
            ];

            
            const currentPathname = window.location.pathname;
            
            const pathSegments = currentPathname.split('/').filter(Boolean);
            const currentHeroPage = pathSegments.slice(-2).join('/'); 

            let currentIndex = heroPaths.indexOf(currentHeroPage);

            
            if (currentIndex === -1) {
                
                const currentHeroNameMatch = currentHeroPage.match(/([^/]+)\.html$/);
                if (currentHeroNameMatch && currentHeroNameMatch[1]) {
                    const heroName = currentHeroNameMatch[1];
                    currentIndex = heroPaths.findIndex(path => path.includes(`${heroName}/${heroName}.html`));
                }
            }

            
            if (currentIndex === -1) {
                currentIndex = 0;
                console.warn("Current hero not found in the hero list. Defaulting to Alchemist.");
            }

            window.prevHero = function() {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) {
                    newIndex = heroPaths.length - 1; 
                }
                window.location.href = '../' + heroPaths[newIndex]; 
            };

            window.nextHero = function() {
                let newIndex = currentIndex + 1;
                if (newIndex >= heroPaths.length) {
                    newIndex = 0; 
                }
                window.location.href = '../' + heroPaths[newIndex]; 
            };


            
            const abilityButtons = document.querySelectorAll('.ability-button');
            const currentAbilityVideo = document.getElementById('currentAbilityVideo');
            const currentAbilityName = document.getElementById('currentAbilityName');
            const currentAbilityDescription = document.getElementById('currentAbilityDescription');
            const abilityTarget = document.getElementById('abilityTarget');
            const abilityDamageType = document.getElementById('abilityDamageType');
            const abilityScales = document.getElementById('abilityScales');
            const abilityArmorReduction = document.getElementById('abilityArmorReduction');
            const abilityDuration = document.getElementById('abilityDuration');
            const abilityRadius = document.getElementById('abilityRadius'); 
            const abilityCooldown = document.getElementById('abilityCooldown');
            const abilityManaCost = document.getElementById('abilityManaCost');
            const abilityNote = document.getElementById('abilityNote'); 

            
            function updateAbilityDisplay(button) {
                
                abilityButtons.forEach(btn => btn.classList.remove('active'));
                
                button.classList.add('active');

                
                const videoSrc = button.dataset.videoSrc;
                const name = button.dataset.name;
                const description = button.dataset.description;
                const target = button.dataset.target || 'N/A';
                const damageType = button.dataset.damageType || 'N/A';
                const scales = button.dataset.scales || 'Ні';
                const armorReduction = button.dataset.armorReduction || 'N/A';
                const duration = button.dataset.duration || 'N/A';
                const radius = button.dataset.radius || 'N/A'; 
                const cooldown = button.dataset.cooldown || 'N/A';
                const manaCost = button.dataset.manaCost || 'N/A';
                const note = button.dataset.note || ''; // Get the note data

                
                currentAbilityVideo.src = videoSrc;
                currentAbilityVideo.load(); 
                currentAbilityVideo.play(); 

                
                currentAbilityName.textContent = name;
                currentAbilityDescription.textContent = description;
                abilityTarget.textContent = target;
                abilityDamageType.textContent = damageType;
                abilityScales.textContent = scales;
                abilityArmorReduction.textContent = armorReduction;
                abilityDuration.textContent = duration;
                abilityRadius.textContent = radius; 
                abilityCooldown.textContent = cooldown;
                abilityManaCost.textContent = manaCost;
                abilityNote.textContent = note; 
            }

            
            abilityButtons.forEach(button => {
                button.addEventListener('click', () => updateAbilityDisplay(button));
            });

            
            if (abilityButtons.length > 0) {
                updateAbilityDisplay(abilityButtons[0]);
            }
        });