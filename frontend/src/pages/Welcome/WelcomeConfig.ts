/*
 * Copyright (C) 2026 Xibo Signage Ltd
 *
 * Xibo - Digital Signage - https://xibosignage.com
 *
 * This file is part of Xibo.
 *
 * Xibo is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * Xibo is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Xibo.  If not, see <http://www.gnu.org/licenses/>.
 */

import createContentImg from '@/assets/onboarding/create-content.png';
import displaysImg from '@/assets/onboarding/displays.png';
import existingContentImg from '@/assets/onboarding/existing-content.png';
import playlistsImg from '@/assets/onboarding/playlists.png';
import scheduleImg from '@/assets/onboarding/schedule.png';

export interface VideoLink {
  id: string;
  title: string;
}

export interface ServiceCard {
  serviceId: string;
  titleKey: string;
  descriptionKey: string;
  imageUrl: string;
  featureFlags: string[];
  links: {
    labelKey: string;
    to: string;
    isExternal?: boolean;
    variant?: 'primary' | 'secondary' | 'link';
  }[];
  videoLinks: VideoLink[];
}

export interface ResourceCard {
  titleKey: string;
  descriptionKey: string;
  iconName: string;
  links: {
    labelKey: string;
    url: string;
  }[];
}

// Main service/feature cards (すべてシステム内部機能への導線のみに限定)
export const SERVICE_CARDS: ServiceCard[] = [
  {
    serviceId: 'displays',
    titleKey: 'Displays',
    descriptionKey:
      'ディスプレイ端末の接続状態や稼働状況を一元管理します。各端末へのコンテンツ配信や設定変更をここから行えます。',
    imageUrl: displaysImg,
    featureFlags: ['displays.view'],
    links: [
      { labelKey: 'Manage Displays', to: '/displays/displays', variant: 'primary' },
    ],
    videoLinks: [],
  },
  {
    serviceId: 'existing-content',
    titleKey: 'Existing Content',
    descriptionKey:
      '画像や動画ファイルなどのメディア素材をアップロードして管理します。アップロードした素材はすぐにスケジュール配信できます。',
    imageUrl: existingContentImg,
    featureFlags: ['library.view', 'layout.view'],
    links: [
      { labelKey: 'Upload Content', to: '/library/media', variant: 'primary' },
      { labelKey: 'Schedule Content', to: '/schedule/events', variant: 'secondary' },
    ],
    videoLinks: [],
  },
  {
    serviceId: 'playlists',
    titleKey: 'Playlists',
    descriptionKey:
      '複数のコンテンツを順番に連続再生するプレイリストを作成・編集し、ディスプレイへ効率的に配信します。',
    imageUrl: playlistsImg,
    featureFlags: ['library.view', 'layout.view'],
    links: [
      { labelKey: 'Create Playlist', to: '/library/playlists', variant: 'primary' },
    ],
    videoLinks: [],
  },
  {
    serviceId: 'create-content',
    titleKey: 'Create Content',
    descriptionKey:
      '直感的なレイアウトエディタを使用して、テキスト、画像、動画、時計などを自由に配置したデザインを作成します。',
    imageUrl: createContentImg,
    featureFlags: ['library.view', 'layout.view'],
    links: [
      { labelKey: 'Design Layout', to: '/design/layout', variant: 'primary' },
    ],
    videoLinks: [],
  },
  {
    serviceId: 'schedule',
    titleKey: 'Schedule',
    descriptionKey:
      '作成したレイアウトやプレイリストを、指定した日時・時間帯・曜日に自動再生するスケジュールを設定します。',
    imageUrl: scheduleImg,
    featureFlags: ['schedule.view'],
    links: [
      { labelKey: 'Schedule Events', to: '/schedule/events', variant: 'primary' },
    ],
    videoLinks: [],
  },
];

// Resource cards（外部Xiboリンクはすべて撤去）
export const RESOURCE_CARDS: ResourceCard[] = [];
