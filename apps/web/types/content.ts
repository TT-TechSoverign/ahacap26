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

export interface LandingContent {
    hero: HeroContent;
    services: {
        title: string;
        title_highlight: string;
        title_suffix: string;
        subtitle: string;
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
    service_center: string;
}

export interface ContentSchema {
    landing: LandingContent;
    contact: ContactContent;
    navigation: NavigationContent;
}
