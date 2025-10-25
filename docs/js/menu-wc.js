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
                                    <span class="icon ion-ios-paper"></span>
                                        README
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
                                            'data-bs-target="#controllers-links-module-AppModule-86ce9adb2ffeb750a50cd1e543a99f1e43573c75a493d0579048e74eb3d1187abf75c8d5bf25a327377775183b6baae51761a1f1f8d5f416a30d9af29da6aa39"' : 'data-bs-target="#xs-controllers-links-module-AppModule-86ce9adb2ffeb750a50cd1e543a99f1e43573c75a493d0579048e74eb3d1187abf75c8d5bf25a327377775183b6baae51761a1f1f8d5f416a30d9af29da6aa39"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-86ce9adb2ffeb750a50cd1e543a99f1e43573c75a493d0579048e74eb3d1187abf75c8d5bf25a327377775183b6baae51761a1f1f8d5f416a30d9af29da6aa39"' :
                                            'id="xs-controllers-links-module-AppModule-86ce9adb2ffeb750a50cd1e543a99f1e43573c75a493d0579048e74eb3d1187abf75c8d5bf25a327377775183b6baae51761a1f1f8d5f416a30d9af29da6aa39"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-86ce9adb2ffeb750a50cd1e543a99f1e43573c75a493d0579048e74eb3d1187abf75c8d5bf25a327377775183b6baae51761a1f1f8d5f416a30d9af29da6aa39"' : 'data-bs-target="#xs-injectables-links-module-AppModule-86ce9adb2ffeb750a50cd1e543a99f1e43573c75a493d0579048e74eb3d1187abf75c8d5bf25a327377775183b6baae51761a1f1f8d5f416a30d9af29da6aa39"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-86ce9adb2ffeb750a50cd1e543a99f1e43573c75a493d0579048e74eb3d1187abf75c8d5bf25a327377775183b6baae51761a1f1f8d5f416a30d9af29da6aa39"' :
                                        'id="xs-injectables-links-module-AppModule-86ce9adb2ffeb750a50cd1e543a99f1e43573c75a493d0579048e74eb3d1187abf75c8d5bf25a327377775183b6baae51761a1f1f8d5f416a30d9af29da6aa39"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' :
                                            'id="xs-controllers-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' :
                                        'id="xs-injectables-links-module-AuthModule-0f13fd9528684adf46fd239b551798c1c0edeff4ca883b4f38f56b1d0e638977bdc248caa4b55f67bb8cf8d429ac37363b4858b160f455540644cb9212de386e"' }>
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
                                            'data-bs-target="#controllers-links-module-HealthModule-d958546f59fdffde48522137595be6218dadd703bcb58d982af3c0b2fb114d853f8f5dc329e1976b6bffc209c2b1e49c4bf273dbc1e9b85ca3e05210a8a4abae"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-d958546f59fdffde48522137595be6218dadd703bcb58d982af3c0b2fb114d853f8f5dc329e1976b6bffc209c2b1e49c4bf273dbc1e9b85ca3e05210a8a4abae"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-d958546f59fdffde48522137595be6218dadd703bcb58d982af3c0b2fb114d853f8f5dc329e1976b6bffc209c2b1e49c4bf273dbc1e9b85ca3e05210a8a4abae"' :
                                            'id="xs-controllers-links-module-HealthModule-d958546f59fdffde48522137595be6218dadd703bcb58d982af3c0b2fb114d853f8f5dc329e1976b6bffc209c2b1e49c4bf273dbc1e9b85ca3e05210a8a4abae"' }>
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
                                            'data-bs-target="#controllers-links-module-ProjectModule-154355f45f3d9363f292c268a486499c62d48ff015b08f52d2b654bef6a6f97432985ca034112cc18b516da48988a72379da54df00a1b4807fe0044bd81ced83"' : 'data-bs-target="#xs-controllers-links-module-ProjectModule-154355f45f3d9363f292c268a486499c62d48ff015b08f52d2b654bef6a6f97432985ca034112cc18b516da48988a72379da54df00a1b4807fe0044bd81ced83"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProjectModule-154355f45f3d9363f292c268a486499c62d48ff015b08f52d2b654bef6a6f97432985ca034112cc18b516da48988a72379da54df00a1b4807fe0044bd81ced83"' :
                                            'id="xs-controllers-links-module-ProjectModule-154355f45f3d9363f292c268a486499c62d48ff015b08f52d2b654bef6a6f97432985ca034112cc18b516da48988a72379da54df00a1b4807fe0044bd81ced83"' }>
                                            <li class="link">
                                                <a href="controllers/ProjectController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProjectModule-154355f45f3d9363f292c268a486499c62d48ff015b08f52d2b654bef6a6f97432985ca034112cc18b516da48988a72379da54df00a1b4807fe0044bd81ced83"' : 'data-bs-target="#xs-injectables-links-module-ProjectModule-154355f45f3d9363f292c268a486499c62d48ff015b08f52d2b654bef6a6f97432985ca034112cc18b516da48988a72379da54df00a1b4807fe0044bd81ced83"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProjectModule-154355f45f3d9363f292c268a486499c62d48ff015b08f52d2b654bef6a6f97432985ca034112cc18b516da48988a72379da54df00a1b4807fe0044bd81ced83"' :
                                        'id="xs-injectables-links-module-ProjectModule-154355f45f3d9363f292c268a486499c62d48ff015b08f52d2b654bef6a6f97432985ca034112cc18b516da48988a72379da54df00a1b4807fe0044bd81ced83"' }>
                                        <li class="link">
                                            <a href="injectables/ProjectService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplatePlaygroundModule.html" data-type="entity-link" >TemplatePlaygroundModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                            'id="xs-components-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                            <li class="link">
                                                <a href="components/TemplatePlaygroundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplatePlaygroundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' : 'data-bs-target="#xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' :
                                        'id="xs-injectables-links-module-TemplatePlaygroundModule-a48e698b66bad8be9ff3b78b5db8e15ee6bb54bd2575fdb1bb61a34e76437cc54b2e161854c3d6c97b4c751d05ff3a43b70b87ceffd46d3c5bf53f6f161e3044"' }>
                                        <li class="link">
                                            <a href="injectables/HbsRenderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HbsRenderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateEditorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateEditorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ZipExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ZipExportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TicketModule.html" data-type="entity-link" >TicketModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TicketModule-507e18b1a12db999e4576dc6348b84c46d8054d7b83e688d7399b2001fec9b4f22f2955cf76934a958aaa3a16a46e8ec36e4eb0e9f65ff55f9d5c9498a3864c0"' : 'data-bs-target="#xs-controllers-links-module-TicketModule-507e18b1a12db999e4576dc6348b84c46d8054d7b83e688d7399b2001fec9b4f22f2955cf76934a958aaa3a16a46e8ec36e4eb0e9f65ff55f9d5c9498a3864c0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TicketModule-507e18b1a12db999e4576dc6348b84c46d8054d7b83e688d7399b2001fec9b4f22f2955cf76934a958aaa3a16a46e8ec36e4eb0e9f65ff55f9d5c9498a3864c0"' :
                                            'id="xs-controllers-links-module-TicketModule-507e18b1a12db999e4576dc6348b84c46d8054d7b83e688d7399b2001fec9b4f22f2955cf76934a958aaa3a16a46e8ec36e4eb0e9f65ff55f9d5c9498a3864c0"' }>
                                            <li class="link">
                                                <a href="controllers/TicketController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TicketModule-507e18b1a12db999e4576dc6348b84c46d8054d7b83e688d7399b2001fec9b4f22f2955cf76934a958aaa3a16a46e8ec36e4eb0e9f65ff55f9d5c9498a3864c0"' : 'data-bs-target="#xs-injectables-links-module-TicketModule-507e18b1a12db999e4576dc6348b84c46d8054d7b83e688d7399b2001fec9b4f22f2955cf76934a958aaa3a16a46e8ec36e4eb0e9f65ff55f9d5c9498a3864c0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TicketModule-507e18b1a12db999e4576dc6348b84c46d8054d7b83e688d7399b2001fec9b4f22f2955cf76934a958aaa3a16a46e8ec36e4eb0e9f65ff55f9d5c9498a3864c0"' :
                                        'id="xs-injectables-links-module-TicketModule-507e18b1a12db999e4576dc6348b84c46d8054d7b83e688d7399b2001fec9b4f22f2955cf76934a958aaa3a16a46e8ec36e4eb0e9f65ff55f9d5c9498a3864c0"' }>
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
                                        'data-bs-target="#injectables-links-module-UserModule-08c181ffdd9902e9ef202c351c0c02d87cca8f038f6ce61ddc0e8e388c431a2f1704ec8bc92ec4da9e0820c9e7c2b07a04c1ce66275d6ab7ee6d1eb915dd4679"' : 'data-bs-target="#xs-injectables-links-module-UserModule-08c181ffdd9902e9ef202c351c0c02d87cca8f038f6ce61ddc0e8e388c431a2f1704ec8bc92ec4da9e0820c9e7c2b07a04c1ce66275d6ab7ee6d1eb915dd4679"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-08c181ffdd9902e9ef202c351c0c02d87cca8f038f6ce61ddc0e8e388c431a2f1704ec8bc92ec4da9e0820c9e7c2b07a04c1ce66275d6ab7ee6d1eb915dd4679"' :
                                        'id="xs-injectables-links-module-UserModule-08c181ffdd9902e9ef202c351c0c02d87cca8f038f6ce61ddc0e8e388c431a2f1704ec8bc92ec4da9e0820c9e7c2b07a04c1ce66275d6ab7ee6d1eb915dd4679"' }>
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
                                <a href="interfaces/CompoDocConfig.html" data-type="entity-link" >CompoDocConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExpressRequestWithUser.html" data-type="entity-link" >ExpressRequestWithUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExpressRequestWithUser-1.html" data-type="entity-link" >ExpressRequestWithUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExpressRequestWithUser-2.html" data-type="entity-link" >ExpressRequestWithUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Template.html" data-type="entity-link" >Template</a>
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
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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