/**
 * UI CONFIG CONSTANTS
 * ===================
 * Centralized constant values for all UI elements in the app.
 * Use these constants for consistency, maintainability, and type safety.
 *
 * @example
 * // Get a mood option
 * const mode = MOOD_OPTIONS[0];
 * // Get a color hex from COLOR_MAP
 * const hex = COLOR_MAP['var(--color-primary)'].hex;
 * // Get a level color variable
 * const colorVar = ITEM_LEVEL_COLOR_MAP['high'];
 */

/**
 * APP_TITLES
 * ----------
 * Maps tab keys to their translation keys for tab titles.
 */
export const APP_TITLES = {
    appTitle: 'appTitles.appTitle',
    welcomeTitle: 'appTitles.welcomeTitle',
    listTitle: 'appTitles.listTitle',
    editTitle: 'appTitles.editTitle',
    itemTitle: 'appTitles.itemTitle'
} as const;

export type AppTitleKey = keyof typeof APP_TITLES;
export type AppTitle = typeof APP_TITLES[AppTitleKey];

/**
 * NAV_OPTIONS
 * -------------
 * List of navigation options for the UI.
 */
export const NAV_OPTIONS = [
    {
        value: 'home',
        name: 'Home',
        label: 'navigation.home',
        icon: '🏠',
        img: '/images/home.svg',
        route: '/welcome'
    },
    // {
    //     value: 'forward',
    //     name: 'Forward',
    //     label: 'navigation.forward',
    //     icon: '➡️',
    //     img: '/images/forward.svg',
    //     route: ''
    // },
    // {
    //     value: 'favorites',
    //     name: 'Favorites',
    //     label: 'navigation.favorites',
    //     icon: '⭐',
    //     img: '/images/fav.svg',
    //     route: '/generic-list/favorites'
    // }
] as const satisfies readonly SwitcherOption[];

export type NavOption = typeof NAV_OPTIONS[number];
export type NavValue = NavOption['value'];

/**
 * MODE_OPTIONS
 * -------------
 * Supported modes for the UI (Dark/Light).
 */
export const MODE_OPTIONS: readonly SwitcherOption[] = [
    {
        value: 'light',
        name: 'Light',
        icon: '☀️',
        img: '/images/sun.svg',
    },
    {
        value: 'dark',
        name: 'Dark',
        icon: '🌙',
        img: '/images/moon.svg',
    }
] as const;

export type ModeMode = typeof MODE_OPTIONS[number]['value'];

export const DEFAULT_MODE: ModeMode = MODE_OPTIONS[0].value;

/**
 * MOOD_OPTIONS
 * -------------
 * List of funny mood colors for the UI.
 */
export const MOOD_OPTIONS = [
    {
        value: 'birthday',
        name: 'Birthday',
        label: 'mood.birthday',
        icon: '🎂',
        img: '/images/cake.svg',
    },
    {
        value: 'leafy',
        name: 'Leafy',
        label: 'mood.leafy',
        icon: '🍃',
        img: '/images/leaf.svg',
    },
    {
        value: 'flowery',
        name: 'Flowery',
        label: 'mood.flowery',
        icon: '💮',
        img: '/images/flowers.svg',
    },
    {
        value: 'tiger',
        name: 'Tiger',
        label: 'mood.tiger',
        icon: '🐯',
        img: '/images/tiger.svg',
    },
    {
        value: 'ocean',
        name: 'Ocean',
        label: 'mood.ocean',
        icon: '🐟',
        img: '/images/ocean.svg',
    }
] as const satisfies readonly SwitcherOption[];

export type MoodOption = typeof MOOD_OPTIONS[number];
export type MoodMode = MoodOption['value'];

export const DEFAULT_MOOD: MoodMode = MOOD_OPTIONS[0].value;

/**
 * LANG_OPTIONS
 * ------------
 * List of supported languages for the UI. Each language can have an optional icon (flag/emoji).
 */
export const LANG_OPTIONS = [
    {
        value: 'en',
        name: 'English',
        label: 'language.english',
        icon: '🇬🇧',
        img: '/images/uk.svg',
    },
    {
        value: 'es',
        name: 'Español',
        label: 'language.spanish',
        icon: '🇪🇸',
        img: '/images/spain.svg',
    },
    {
        value: 'de',
        name: 'Deutsch',
        label: 'language.deutsch',
        icon: '🇩🇪',
        img: '/images/deutsch.svg',
    },
] as const satisfies readonly SwitcherOption[];

export type LangOption = typeof LANG_OPTIONS[number];
export type LangCode = LangOption['value'];

/**
 * Generic option type for switchers (Modes, language, etc.)
 */
export type SwitcherOption = {
    value: string;
    name?: string;
    label?: string;
    icon?: string;
    img?: string;
    route?: string;
    mode?: string;
};

export type RotationDirection = 'next' | 'prev';

/**
 * AVATAR_OPTIONS
 * --------------
 * List of allowed emoji avatars for selection.
 */
export const AVATAR_OPTIONS = [
    "😀", "😎", "🤩", "🥳", "😇", "🤗", "🙃", "😏", "🤠", "🤓", "🧐", "🤪", "😜", "🤯", "🥰", "😍"
] as const;

export type AvatarOption = typeof AVATAR_OPTIONS[number];

/**
 * COLOR_MAP
 * ---------
 * Centralized mapping of CSS variable color keys to color info objects.
 */
export const COLOR_MAP = {
    'var(--color-primary)': { name: 'color.primary', hex: '#f8bbd9' },
    'var(--color-secondary)': { name: 'color.secondary', hex: '#26c6da' },
    'var(--color-tertiary)': { name: 'color.tertiary', hex: '#ab47bc' },
    'var(--color-success)': { name: 'color.success', hex: '#4E8B0A' },
    'var(--color-warning)': { name: 'color.warning', hex: '#D98200' },
    'var(--color-danger)': { name: 'color.danger', hex: '#B00000' },
    'var(--color-light)': { name: 'color.light', hex: '#f6f8fc' },
    'var(--color-medium)': { name: 'color.medium', hex: '#5f5f5f' },
    'var(--color-dark)': { name: 'color.dark', hex: '#2f2f2f' },
    // Custom colors
    'var(--color-red)': { name: 'color.red', hex: '#ef5350' },
    'var(--color-orange)': { name: 'color.orange', hex: '#ff9800' },
    'var(--color-yellow)': { name: 'color.yellow', hex: '#ffd54f' },
    'var(--color-lime)': { name: 'color.lime', hex: '#b1d62e' },
    'var(--color-green)': { name: 'color.green', hex: '#66bb6a' },
    'var(--color-azure)': { name: 'color.azure', hex: '#42a5f5' },
    'var(--color-klein)': { name: 'color.klein', hex: '#0032a0' },
    'var(--color-magenta)': { name: 'color.magenta', hex: '#FD3DB5' },
    'var(--color-neutral)': { name: 'color.neutral', hex: '#90a4ae' }
} as const;

export type ColorKey = keyof typeof COLOR_MAP;
export type ColorInfo = (typeof COLOR_MAP)[ColorKey];

/**
 * COLOR_KEYS
 * ----------
 * Flat array of all available color keys for iteration or validation.
 */
export const COLOR_KEYS = Object.keys(COLOR_MAP) as Array<keyof typeof COLOR_MAP>;

/**
 * ALL_COLOR_OPTIONS
 * -----------------
 * Array of all color keys, for use in selectors or validation.
 */
export const ALL_COLOR_OPTIONS = [...COLOR_KEYS] as const;

/**
 * AllColors
 * ---------
 * Union type of all available color keys (from ALL_COLOR_OPTIONS).
 */
export type AllColors = typeof ALL_COLOR_OPTIONS[number];

/**
 * ITEM_LEVEL_COLOR_MAP
 * --------------------
 * Maps item levels to their associated CSS color variables.
 * Ensures consistent color assignment for each item level across the UI.
 */
export const ITEM_LEVEL_COLOR_MAP = {
    high: 'var(--color-danger)',
    medium: 'var(--color-warning)',
    low: 'var(--color-success)',
    funny: 'var(--color-tertiary)',
    // epic: 'var(--color-dark)'
} as const;

export type ItemLevel = keyof typeof ITEM_LEVEL_COLOR_MAP;
export type ItemLevelColor = (typeof ITEM_LEVEL_COLOR_MAP)[ItemLevel];
