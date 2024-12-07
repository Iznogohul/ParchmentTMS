'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ParchmentTMS Documentation 📖</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-97955659d06bdf33272305667d70d92c00c10c55796b97f4d9272c2212f40ce21de8adaaccecd369f3de58cbdc0c121f0b20be9916ad76b5ed3ee7e07ab7e63d"' : 'data-bs-target="#xs-controllers-links-module-AppModule-97955659d06bdf33272305667d70d92c00c10c55796b97f4d9272c2212f40ce21de8adaaccecd369f3de58cbdc0c121f0b20be9916ad76b5ed3ee7e07ab7e63d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-97955659d06bdf33272305667d70d92c00c10c55796b97f4d9272c2212f40ce21de8adaaccecd369f3de58cbdc0c121f0b20be9916ad76b5ed3ee7e07ab7e63d"' :
                                            'id="xs-controllers-links-module-AppModule-97955659d06bdf33272305667d70d92c00c10c55796b97f4d9272c2212f40ce21de8adaaccecd369f3de58cbdc0c121f0b20be9916ad76b5ed3ee7e07ab7e63d"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-97955659d06bdf33272305667d70d92c00c10c55796b97f4d9272c2212f40ce21de8adaaccecd369f3de58cbdc0c121f0b20be9916ad76b5ed3ee7e07ab7e63d"' : 'data-bs-target="#xs-injectables-links-module-AppModule-97955659d06bdf33272305667d70d92c00c10c55796b97f4d9272c2212f40ce21de8adaaccecd369f3de58cbdc0c121f0b20be9916ad76b5ed3ee7e07ab7e63d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-97955659d06bdf33272305667d70d92c00c10c55796b97f4d9272c2212f40ce21de8adaaccecd369f3de58cbdc0c121f0b20be9916ad76b5ed3ee7e07ab7e63d"' :
                                        'id="xs-injectables-links-module-AppModule-97955659d06bdf33272305667d70d92c00c10c55796b97f4d9272c2212f40ce21de8adaaccecd369f3de58cbdc0c121f0b20be9916ad76b5ed3ee7e07ab7e63d"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-7233d462ec9898dda0d5033315314cb207f369ec39db121796f8a43f68c28956095157fb122435f8eac5ad61ceaa9ac5b157d9dea0a6e4bf64927acdd3f5dcec"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-7233d462ec9898dda0d5033315314cb207f369ec39db121796f8a43f68c28956095157fb122435f8eac5ad61ceaa9ac5b157d9dea0a6e4bf64927acdd3f5dcec"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-7233d462ec9898dda0d5033315314cb207f369ec39db121796f8a43f68c28956095157fb122435f8eac5ad61ceaa9ac5b157d9dea0a6e4bf64927acdd3f5dcec"' :
                                            'id="xs-controllers-links-module-AuthModule-7233d462ec9898dda0d5033315314cb207f369ec39db121796f8a43f68c28956095157fb122435f8eac5ad61ceaa9ac5b157d9dea0a6e4bf64927acdd3f5dcec"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-7233d462ec9898dda0d5033315314cb207f369ec39db121796f8a43f68c28956095157fb122435f8eac5ad61ceaa9ac5b157d9dea0a6e4bf64927acdd3f5dcec"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-7233d462ec9898dda0d5033315314cb207f369ec39db121796f8a43f68c28956095157fb122435f8eac5ad61ceaa9ac5b157d9dea0a6e4bf64927acdd3f5dcec"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-7233d462ec9898dda0d5033315314cb207f369ec39db121796f8a43f68c28956095157fb122435f8eac5ad61ceaa9ac5b157d9dea0a6e4bf64927acdd3f5dcec"' :
                                        'id="xs-injectables-links-module-AuthModule-7233d462ec9898dda0d5033315314cb207f369ec39db121796f8a43f68c28956095157fb122435f8eac5ad61ceaa9ac5b157d9dea0a6e4bf64927acdd3f5dcec"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-289cf22dfa3c710a0d2c557dd2d0dc44c2399adfc5fc869f2e43b1576cd1fe418e711c0c5926aedf90cb1a555b9f22651c4c40f51b5e44f067a04e86c9c30c40"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-289cf22dfa3c710a0d2c557dd2d0dc44c2399adfc5fc869f2e43b1576cd1fe418e711c0c5926aedf90cb1a555b9f22651c4c40f51b5e44f067a04e86c9c30c40"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-289cf22dfa3c710a0d2c557dd2d0dc44c2399adfc5fc869f2e43b1576cd1fe418e711c0c5926aedf90cb1a555b9f22651c4c40f51b5e44f067a04e86c9c30c40"' :
                                            'id="xs-controllers-links-module-HealthModule-289cf22dfa3c710a0d2c557dd2d0dc44c2399adfc5fc869f2e43b1576cd1fe418e711c0c5926aedf90cb1a555b9f22651c4c40f51b5e44f067a04e86c9c30c40"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectModule.html" data-type="entity-link" >ProjectModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProjectModule-f39b97e24b23be7a233c61959a57dd355f327f7fce6e14709a266ad017d32fe0f8c670a4232958e2c9fc545fd95da9d583b56a7d6fec3c0f711e84c8f283d3e1"' : 'data-bs-target="#xs-controllers-links-module-ProjectModule-f39b97e24b23be7a233c61959a57dd355f327f7fce6e14709a266ad017d32fe0f8c670a4232958e2c9fc545fd95da9d583b56a7d6fec3c0f711e84c8f283d3e1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProjectModule-f39b97e24b23be7a233c61959a57dd355f327f7fce6e14709a266ad017d32fe0f8c670a4232958e2c9fc545fd95da9d583b56a7d6fec3c0f711e84c8f283d3e1"' :
                                            'id="xs-controllers-links-module-ProjectModule-f39b97e24b23be7a233c61959a57dd355f327f7fce6e14709a266ad017d32fe0f8c670a4232958e2c9fc545fd95da9d583b56a7d6fec3c0f711e84c8f283d3e1"' }>
                                            <li class="link">
                                                <a href="controllers/ProjectController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProjectModule-f39b97e24b23be7a233c61959a57dd355f327f7fce6e14709a266ad017d32fe0f8c670a4232958e2c9fc545fd95da9d583b56a7d6fec3c0f711e84c8f283d3e1"' : 'data-bs-target="#xs-injectables-links-module-ProjectModule-f39b97e24b23be7a233c61959a57dd355f327f7fce6e14709a266ad017d32fe0f8c670a4232958e2c9fc545fd95da9d583b56a7d6fec3c0f711e84c8f283d3e1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProjectModule-f39b97e24b23be7a233c61959a57dd355f327f7fce6e14709a266ad017d32fe0f8c670a4232958e2c9fc545fd95da9d583b56a7d6fec3c0f711e84c8f283d3e1"' :
                                        'id="xs-injectables-links-module-ProjectModule-f39b97e24b23be7a233c61959a57dd355f327f7fce6e14709a266ad017d32fe0f8c670a4232958e2c9fc545fd95da9d583b56a7d6fec3c0f711e84c8f283d3e1"' }>
                                        <li class="link">
                                            <a href="injectables/ProjectService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TicketModule.html" data-type="entity-link" >TicketModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TicketModule-e9835587e3835405c47a6033413000467c1569c9a93e5825d6dea127d53f690bd55fd01a510067b099fe4eb39ba1cf189223e483cba3364835db705eadd20567"' : 'data-bs-target="#xs-controllers-links-module-TicketModule-e9835587e3835405c47a6033413000467c1569c9a93e5825d6dea127d53f690bd55fd01a510067b099fe4eb39ba1cf189223e483cba3364835db705eadd20567"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TicketModule-e9835587e3835405c47a6033413000467c1569c9a93e5825d6dea127d53f690bd55fd01a510067b099fe4eb39ba1cf189223e483cba3364835db705eadd20567"' :
                                            'id="xs-controllers-links-module-TicketModule-e9835587e3835405c47a6033413000467c1569c9a93e5825d6dea127d53f690bd55fd01a510067b099fe4eb39ba1cf189223e483cba3364835db705eadd20567"' }>
                                            <li class="link">
                                                <a href="controllers/TicketController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TicketModule-e9835587e3835405c47a6033413000467c1569c9a93e5825d6dea127d53f690bd55fd01a510067b099fe4eb39ba1cf189223e483cba3364835db705eadd20567"' : 'data-bs-target="#xs-injectables-links-module-TicketModule-e9835587e3835405c47a6033413000467c1569c9a93e5825d6dea127d53f690bd55fd01a510067b099fe4eb39ba1cf189223e483cba3364835db705eadd20567"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TicketModule-e9835587e3835405c47a6033413000467c1569c9a93e5825d6dea127d53f690bd55fd01a510067b099fe4eb39ba1cf189223e483cba3364835db705eadd20567"' :
                                        'id="xs-injectables-links-module-TicketModule-e9835587e3835405c47a6033413000467c1569c9a93e5825d6dea127d53f690bd55fd01a510067b099fe4eb39ba1cf189223e483cba3364835db705eadd20567"' }>
                                        <li class="link">
                                            <a href="injectables/TicketService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-1420bfd821c0c89e0ec090cedf99a0e030aba12a5fe7aee305d2497bd6bc82cc8b67dbf97ae8424c68de1907980d2ecb10866030abbff44fd185de58e95767e6"' : 'data-bs-target="#xs-injectables-links-module-UserModule-1420bfd821c0c89e0ec090cedf99a0e030aba12a5fe7aee305d2497bd6bc82cc8b67dbf97ae8424c68de1907980d2ecb10866030abbff44fd185de58e95767e6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-1420bfd821c0c89e0ec090cedf99a0e030aba12a5fe7aee305d2497bd6bc82cc8b67dbf97ae8424c68de1907980d2ecb10866030abbff44fd185de58e95767e6"' :
                                        'id="xs-injectables-links-module-UserModule-1420bfd821c0c89e0ec090cedf99a0e030aba12a5fe7aee305d2497bd6bc82cc8b67dbf97ae8424c68de1907980d2ecb10866030abbff44fd185de58e95767e6"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateProjectDto.html" data-type="entity-link" >CreateProjectDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTicketDto.html" data-type="entity-link" >CreateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Project.html" data-type="entity-link" >Project</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectDoesNotExist.html" data-type="entity-link" >ProjectDoesNotExist</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectError.html" data-type="entity-link" >ProjectError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectIdValidationError.html" data-type="entity-link" >ProjectIdValidationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectInsufficientPermissionsError.html" data-type="entity-link" >ProjectInsufficientPermissionsError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectNotModifiedError.html" data-type="entity-link" >ProjectNotModifiedError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectRelationConflict.html" data-type="entity-link" >ProjectRelationConflict</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectSlugValidationError.html" data-type="entity-link" >ProjectSlugValidationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectUpdateDataValidationError.html" data-type="entity-link" >ProjectUpdateDataValidationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ticket.html" data-type="entity-link" >Ticket</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketDoesNotExist.html" data-type="entity-link" >TicketDoesNotExist</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketError.html" data-type="entity-link" >TicketError</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketIdValidationError.html" data-type="entity-link" >TicketIdValidationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketInsufficientPermissionsError.html" data-type="entity-link" >TicketInsufficientPermissionsError</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketNotModifiedError.html" data-type="entity-link" >TicketNotModifiedError</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketRelationConflict.html" data-type="entity-link" >TicketRelationConflict</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketSlugValidationError.html" data-type="entity-link" >TicketSlugValidationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProjectDto.html" data-type="entity-link" >UpdateProjectDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTicketDto.html" data-type="entity-link" >UpdateTicketDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ExpressRequestWithUser.html" data-type="entity-link" >ExpressRequestWithUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExpressRequestWithUser-1.html" data-type="entity-link" >ExpressRequestWithUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExpressRequestWithUser-2.html" data-type="entity-link" >ExpressRequestWithUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});