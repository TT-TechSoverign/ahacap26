export interface HeroContent {
    badge: string;
    title_line1: string;
    title_highlight1: string;
    title_highlight2: string;
    badges: {
        lg: string;
        licensed: string;
        energy: string;
    };
    cta_shop: string;
    cta_estimate: string;
}

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    link: string;
    icon: string;
    href: string;
    badge?: string;
    color: string;
}

export interface CarouselSlide {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    category: string;
    location: string;
}

export interface PartnershipContent {
    title: string;
    title_highlight: string;
    backlinking: {
        part1: string;
        link1_text: string;
        part2: string;
        link2_text: string;
        part3: string;
        link3_text: string;
        part4: string;
    };
}

export interface WarehouseContent {
    badge: string;
    title: string;
    description: string;
    address_label: string;
    address_value: string;
    directions_label: string;
    directions_value: string;
    cta_text: string;
}

export interface LogisticsContent {
    pickup: {
        title: string;
        pricing_notice: string;
        process: string;
        warning: string;
    };
    delivery: {
        title: string;
        price_label: string;
        price_value: string;
        coverage: string;
        exclusions_label: string;
        exclusions: string;
    };
}

export interface LandingContent {
    hero: HeroContent;
    services: {
        title: string;
        title_highlight: string;
        title_suffix: string;
        subtitle: string;
        backlinking: {
            part1: string;
            link1_text: string;
            part2: string;
            link2_text: string;
            part3: string;
            link3_text: string;
            part4: string;
            link4_text: string;
            part5: string;
        };
        grid: ServiceItem[];
        carousel: CarouselSlide[];
    };
    service_areas: {
        badge: string;
        title: string;
        title_highlight: string;
        description: string;
        backlinking: {
            part1: string;
            link1_text: string;
            part2: string;
            link2_text: string;
            part3: string;
        };
        regions: {
            id: string;
            title: string;
            icon: string;
            cities: string[];
        }[];
    };
    partnerships: PartnershipContent;
    warehouse: WarehouseContent;
    sections: string[];
}

export interface ContactContent {
    badge: string;
    title: string;
    title_highlight: string;
    description: string;
    direct_contact_title: string;
    phone_label: string;
    phone_value: string;
    email_label: string;
    email_value: string;
    address_label: string;
    address_value: string;
    calendar: {
        title: string;
        split_section_title: string;
        split_estimate_label: string;
        split_estimate_value: string;
        split_install_label: string;
        split_install_value: string;
        window_section_title: string;
        window_estimate_label: string;
        window_estimate_value: string;
        window_install_label: string;
        window_install_value: string;
    };
    wizard_title: string;
    wizard_subtitle: string;
    wizard_ticket_prefix: string;
    wizard: {
        step1_title: string;
        step1_subtitle: string;
        step2_title: string;
        step2_subtitle: string;
        step2_urgency_label: string;
        step2_contact_time_label: string;
        step3_title: string;
        step3_subtitle: string;
        field_first_name: string;
        field_last_name: string;
        field_email: string;
        field_phone: string;
        field_address: string;
        field_city: string;
        field_zip: string;
        field_source: string;
        field_notes: string;
        btn_next_urgency: string;
        btn_next_contact: string;
        btn_back: string;
        btn_submit: string;
        services_list: string[];
    };
    hours_title: string;
    hours_mon_fri: string;
    hours_sat: string;
    hours_sun: string;
}

export interface NavigationContent {
    links: {
        text: string;
        href: string;
    }[];
    contact_btn: string;
    back_to_home: string;
    back_to_inventory: string;
    service_center: string;
}

export interface ShopSectionContent {
    title: string;
    subtitle: string;
    description: string;
}

export interface ShopContent {
    search_placeholder: string;
    hero: {
        subtitle: string;
        title_line1: string;
        title_line2: string;
        description: string;
    };
    sections: string[];
    dual_inverter: ShopSectionContent;
    universal_fit: ShopSectionContent;
    base: ShopSectionContent;
    ge: ShopSectionContent;
    casement: ShopSectionContent;
    local_authority: {
        badge: string;
        title_line1: string;
        title_italic: string;
        title_gradient: string;
        subtitle: string;
        description: string;
        location: string;
    };
    brand_spotlight: {
        brand_spotlight?: {
            title: string;
            title_italic: string;
            badge: string;
        };
        title?: string;
        title_italic?: string;
        badge?: string;
    };
    filters: {
        title: string;
        clear: string;
        category: string;
        inventory_status: string;
    };
    sidebar: {
        expert_support_title: string;
        expert_support_desc: string;
    };
    guide: {
        subtitle: string;
        title: string;
        description: string;
        info_title: string;
        info_desc: string;
    };
    faq: {
        title: string;
    };
    bento: {
        lg: {
            title: string;
            description: string;
        };
        ge: {
            title: string;
            description: string;
        };
    };
}

export interface MaintenanceContent {
    hero: {
        badge: string;
        title: string;
        title_highlight: string;
        title_suffix: string;
        description: string;
        cta_schedule: string;
        cta_rates: string;
    };
    technician: {
        name: string;
        title: string;
        cert1: string;
        cert2: string;
        quote: string;
    };
    video: {
        title: string;
        youtube_id: string;
        features: {
            [key: string]: {
                title: string;
                sub: string;
                color: string;
                icon: string;
            };
        };
    };
    climate: {
        title: string;
        title_highlight: string;
        title_suffix: string;
        description_p1: string;
        description_p2_prefix: string;
        description_p2_highlight: string;
        description_p2_suffix: string;
        description_p3_prefix: string;
        description_p3_highlight: string;
        description_p3_suffix: string;
    };
    process: {
        title: string;
        title_highlight: string;
        title_suffix: string;
        subtitle: string;
        step1_title: string;
        step1_description: string;
        step1_point1: string;
        step1_point2: string;
        step2: { title: string; desc: string; };
        step3: { title: string; desc: string; };
        step4: { title: string; desc: string; };
        step5: { title: string; desc: string; };
    };
    before_after: {
        title: string;
        title_highlight: string;
        label_initial: string;
        label_pre: string;
        label_post: string;
        label_restored: string;
        badge_mold: string;
        badge_clean: string;
    };
    coverage: {
        title: string;
        title_highlight: string;
        subtitle: string;
        cities: string[];
        map_label: string;
    };
    tech_hub: {
        title: string;
        link1: string;
        link2: string;
        link3: string;
    };
    faq: {
        title: string;
        title_highlight: string;
        items: { q: string; a: string; }[];
    };
    floating_cta: string;
}

export interface SystemUpgradeContent {
    status_badge: string;
    title_line1: string;
    title_line2: string;
    description: string;
    status_pill: string;
    cta_button: string;
    footer: string;
}

export interface ContentSchema {
    landing: LandingContent;
    contact: ContactContent;
    navigation: NavigationContent;
    shop: ShopContent;
    logistics: LogisticsContent;
    maintenance: MaintenanceContent;
    system_upgrade: SystemUpgradeContent;
}
