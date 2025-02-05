export interface StorableSidebar {
    version: number;
    sidebar: Sidebar;
}

export interface Sidebar {
    containers: Container[];
}

export interface Container {
    global?: Record<string, unknown>;
    spaces?: [string, Space];
    items?: [string, Item];
    topAppsContainerIDs?: (string | CustomContainer | DefaultContainer)[];
}

export interface Item {
    createdAt: number;
    isUnread: boolean;
    id: string;
    childrenIds: string[];
    data: {
        tab?: {
            activeTabBeforeCreationID: string;
            timeLastActiveAt: number;
            savedTitle?: string;
            savedURL: string;
            savedMuteStatus: string;
        };
    };
    parentID: string;
    title: string;
    originatingDevice: string;
}

export interface CustomContainer {
    custom: {
        _0: {
            directoryBasename: string;
            machineID: string;
        };
    };
}

export interface DefaultContainer {
    default: Record<string, unknown>;
}

export interface Space {
    newContainerIDs: (PinnedContainer | string | UnpinnedContainer)[];
    profile: Profile;
    id: string;
    containerIDs: string[];
    customInfo: CustomInfo;
    title: string;
}

export interface PinnedContainer {
    pinned: Record<string, unknown>;
}

export interface UnpinnedContainer {
    unpinned: {
        _0: {
            shared: Record<string, unknown>;
        };
    };
}

export interface Profile {
    default: Record<string, unknown>;
}

export interface CustomInfo {
    iconType: IconType;
    windowTheme: WindowTheme;
}

export interface IconType {
    emoji: number;
    emoji_v2: string;
}

export interface WindowTheme {
    background: Background;
    semanticColorPalette: SemanticColorPalette;
    primaryColorPalette: PrimaryColorPalette;
}

export interface Background {
    single: {
        _0: {
            isVibrant: boolean;
            contentOverBackgroundAppearance: string;
            style: {
                color: {
                    _0: {
                        blendedGradient?: BlendedGradient;
                        blendedSingleColor?: BlendedSingleColor;
                    };
                };
            };
        };
    };
}

export interface BlendedGradient {
    _0: {
        modifiers: Modifiers;
        translucencyStyle: string;
        baseColors: Color[];
        overlayColors: Color[];
        wheel: {
            analogous: Record<string, unknown>;
        };
    };
}

export interface BlendedSingleColor {
    _0: {
        modifiers: Modifiers;
        color: Color;
        translucencyStyle: string;
    };
}

export interface Modifiers {
    overlay: string;
    intensityFactor: number;
    noiseFactor: number;
}

export interface Color {
    blue: number;
    colorSpace: string;
    red: number;
    green: number;
    alpha: number;
}

export interface SemanticColorPalette {
    appearanceBased: {
        dark: Appearance;
        light: Appearance;
    };
}

export interface Appearance {
    title: Color;
    subtitle: Color;
    maxContrastColor: Color;
    background: Color;
    backgroundExtra: Color;
    foregroundSecondary: Color;
    cutoutColor: Color;
    hover: Color;
    minContrastColor: Color;
    foregroundTertiary: Color;
    foregroundPrimary: Color;
    focus: Color;
}

export interface PrimaryColorPalette {
    shadedDark: Color;
    tintedLight: Color;
    midTone: Color;
    shaded: Color;
}

export interface Bookmark {
    id: string;
    title: string;
    url: string;
}

export interface BookmarkGroup {
    [id: string]: {
        name: string;
        bookmarks: Bookmark[];
    };
}
